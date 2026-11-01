import {  Service } from '@angular/core';
import { PlayerSymbol } from "../../models/game-model"

@Service()
export class GameService {
  private readonly WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]          
  ];

  checkWin(board: (PlayerSymbol | null)[]): { line: number[] } | null {
    for (const combo of this.WINNING_COMBINATIONS) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { line: combo };
      }
    }
    return null;
  }

  checkDraw(board: (PlayerSymbol | null)[]): boolean {
    return board.every(cell => cell !== null);
  }
}