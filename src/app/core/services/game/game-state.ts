import { Service, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { GameState, GameStatus, Player, PlayerSymbol, TournamentLength } from '../../models/game-model';
import { GameService } from './game-service';
import { StorageService } from "../storage/storage-service";

const initialState: GameState = {
  player1: { name: '', symbol: 'X' },
  player2: { name: '', symbol: 'O' },
  targetGames: 3,
  currentGame: 1,
  board: Array(9).fill(null),
  currentTurn: 'X',
  startingTurn: 'X',
  scores: { player1: 0, player2: 0, draws: 0 },
  winningLine: null,
  status: GameStatus.SETUP,
};

@Service()
export class GameStateService {
  private gameRules = inject(GameService);
  private storage = inject(StorageService);

  private stateSubject = new BehaviorSubject<GameState>(this.loadInitialState());
  public state$: Observable<GameState> = this.stateSubject.asObservable();

  public currentPlayerName$: Observable<string> = this.state$.pipe(
    map(state => state.currentTurn === state.player1.symbol ? state.player1.name : state.player2.name),
    distinctUntilChanged()
  );

  public tournamentWinner$: Observable<string | null> = this.state$.pipe(
    map(state => {
      if (state.status !== GameStatus.TOURNAMENT_COMPLETE) return null;
      const { player1, player2 } = state.scores;
      if (player1 > player2) return state.player1.name;
      if (player2 > player1) return state.player2.name;
      return '(Draw)';
    }),
    distinctUntilChanged()
  );

  private loadInitialState(): GameState {
    const saved = this.storage.loadState<GameState>();
    return saved ? saved : initialState;
  }

  private updateState(newState: GameState): void {
    this.stateSubject.next(newState);
    this.storage.saveState(newState);
  }

  startTournament(player1: Player, player2: Player, targetGames: TournamentLength): void {
    const newState: GameState = {
      ...initialState,
      player1,
      player2,
      targetGames,
      currentGame: 1,
      currentTurn: player1.symbol,
      startingTurn: player1.symbol,
      status: GameStatus.IN_PROGRESS,
    };
    this.updateState(newState);
  }

  makeMove(index: number): void {
    const currentState = this.stateSubject.getValue();
    const board = [...currentState.board];

    if (board[index] || currentState.status !== GameStatus.IN_PROGRESS) return;

    board[index] = currentState.currentTurn;
    const winResult = this.gameRules.checkWin(board);
    const isDraw = !winResult && this.gameRules.checkDraw(board);

    if (winResult) {
      const isP1Win = currentState.currentTurn === currentState.player1.symbol;
      const scores = {
        ...currentState.scores,
        player1: isP1Win ? currentState.scores.player1 + 1 : currentState.scores.player1,
        player2: !isP1Win ? currentState.scores.player2 + 1 : currentState.scores.player2,
      };
      const isTournamentOver = currentState.currentGame >= currentState.targetGames;

      this.updateState({
        ...currentState,
        board,
        winningLine: winResult.line,
        scores,
        status: GameStatus.ROUND_OVER,
      });

      if (isTournamentOver) {
        setTimeout(() => {
          const latestState = this.stateSubject.getValue();
          if (latestState.status === GameStatus.ROUND_OVER) {
            this.updateState({
              ...latestState,
              status: GameStatus.TOURNAMENT_COMPLETE,
            });
          }
        }, 1800); 
      }
      return;
    }

    if (isDraw) {
      const scores = {
        ...currentState.scores,
        draws: currentState.scores.draws + 1,
      };
      const isTournamentOver = currentState.currentGame >= currentState.targetGames;

      this.updateState({
        ...currentState,
        board,
        scores,
        status: GameStatus.ROUND_OVER,
      });

      if (isTournamentOver) {
        setTimeout(() => {
          const latestState = this.stateSubject.getValue();
          if (latestState.status === GameStatus.ROUND_OVER) {
            this.updateState({
              ...latestState,
              status: GameStatus.TOURNAMENT_COMPLETE,
            });
          }
        }, 1800);
      }
      return;
    }

    const nextTurn: PlayerSymbol = currentState.currentTurn === 'X' ? 'O' : 'X';
    this.updateState({
      ...currentState,
      board,
      currentTurn: nextTurn,
    });
  }

  nextGame(): void {
    const currentState = this.stateSubject.getValue();
    if (currentState.currentGame >= currentState.targetGames) return;

    const nextStartingTurn: PlayerSymbol = currentState.startingTurn === 'X' ? 'O' : 'X';

    this.updateState({
      ...currentState,
      currentGame: currentState.currentGame + 1,
      board: Array(9).fill(null),
      winningLine: null,
      startingTurn: nextStartingTurn,
      currentTurn: nextStartingTurn,
      status: GameStatus.IN_PROGRESS,
    });
  }

  resetTournament(): void {
    this.storage.clearState();
    this.updateState(initialState);
  }
}