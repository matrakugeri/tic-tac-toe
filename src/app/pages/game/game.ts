import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GameStateService } from '../../core/services/game/game-state';
import { GameStatus } from '../../core/models/game-model';
import { TournamentSummaryComponent } from './components/tournament-summary/tournament-summary';
import { ScoreboardComponent } from './components/scoreboard/scoreboard';
import { BoardComponent } from './components/board/board';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule, 
    TournamentSummaryComponent, 
    ScoreboardComponent, 
    BoardComponent
  ],
  styleUrl: './game.scss',
  templateUrl: './game.html',
})
export class Game {
  private readonly gameStateService = inject(GameStateService);
  private readonly router = inject(Router);

  readonly GameStatus = GameStatus;

  readonly state$ = this.gameStateService.state$;
  readonly activePlayerName$ = this.gameStateService.currentPlayerName$;
  readonly tournamentWinner$ = this.gameStateService.tournamentWinner$;

  makeMove(index: number): void {
    this.gameStateService.makeMove(index);
  }

  nextGame(): void {
    this.gameStateService.nextGame();
  }

  restartTournament(): void {
    this.gameStateService.resetTournament();
    this.router.navigate(['/setup']);
  }
}