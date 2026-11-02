import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerSymbol, TournamentLength } from '../../core/models/game-model';
import { GameStateService } from '../../core/services/game/game-state';
import { SetupFormComponent } from './components/setup-form/setup-form';

@Component({
  selector: 'app-setup',
  standalone: true,
  imports: [SetupFormComponent],
  styleUrl: './setup.scss',
  templateUrl: './setup.html',
})
export class Setup {
  private readonly router = inject(Router);
  private readonly gameStateService = inject(GameStateService);

  onTournamentStart(formData: {
    player1Name: string;
    player2Name: string;
    player1Symbol: PlayerSymbol;
    totalGames: TournamentLength;
  }): void {
    const { player1Name, player2Name, player1Symbol, totalGames } = formData;

    const p1Symbol = player1Symbol;
    const p2Symbol: PlayerSymbol = p1Symbol === 'X' ? 'O' : 'X';

    this.gameStateService.startTournament(
      { name: player1Name.trim(), symbol: p1Symbol },
      { name: player2Name.trim(), symbol: p2Symbol },
      totalGames,
    );

    this.router.navigate(['/game']);
  }
}
