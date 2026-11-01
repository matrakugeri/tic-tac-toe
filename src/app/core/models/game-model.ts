export type PlayerSymbol = 'X' | 'O';
export type TournamentLength = 1 | 3 | 5;
export enum GameStatus {
  SETUP = 'SETUP',
  IN_PROGRESS = 'IN_PROGRESS',
  ROUND_OVER = 'ROUND_OVER',
  TOURNAMENT_COMPLETE = 'TOURNAMENT_COMPLETE'
}

export interface Player {
  name: string;
  symbol: PlayerSymbol;
}

export interface Scores {
  player1: number;
  player2: number;
  draws: number;
}

export interface GameState {
  player1: Player;
  player2: Player;
  targetGames: TournamentLength;
  currentGame: number;
  board: (PlayerSymbol | null)[];
  currentTurn: PlayerSymbol;
  startingTurn: PlayerSymbol;
  scores: Scores;
  winningLine: number[] | null;
  status: GameStatus;
}