export type PlayerSymbol = 'X' | 'O';

export interface Player {
  name: string;
  symbol: PlayerSymbol;
}

export interface Score {
  playerXWins: number;
  playerOWins: number;
  draws: number;
}

export type GamePhase = 'setup' | 'playing' | 'round-over' | 'completed';

export interface TournamentState {
  phase: GamePhase;
  player1: Player | null;
  player2: Player | null;
  totalGames: number;
  currentGameIndex: number;
  board: (PlayerSymbol | null)[];
  currentTurn: PlayerSymbol;
  startingPlayerSymbol: PlayerSymbol;
  scores: Score;
  winner: Player | null;
}