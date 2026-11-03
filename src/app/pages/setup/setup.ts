import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerSymbol, TournamentLength } from '../../core/models/game-model';
import { GameStateService } from '../../core/services/game/game-state';
import { SetupFormComponent } from './components/setup-form/setup-form';

@Component({
  selector: 'app-setup',
  standalone: true,
  imports: [SetupFormComponent],
  styles: [
    `
      @use 'mixins' as m;

      :host {
        display: block;
        width: 100%;
      }

      .setup-card {
        @include m.card;
        padding: 32px;

        h2 {
          margin: 0 0 8px;
          font-size: 23px;
          font-weight: 700;
        }
      }

      .card-description {
        margin: 0 0 28px;
        color: var(--color-text-secondary);
        font-size: 14px;
      }

      .setup-container {
        width: 100%;
        max-width: var(--form-width);
        margin-inline: auto;
      }

      .setup-header {
        text-align: center;
        margin-bottom: 24px;

        h1 {
          margin: 0 0 5px;
          font-size: 34px;
          font-weight: 800;
          line-height: 1.2;
        }

        p {
          margin: 0;
          font-size: 16px;
          color: var(--color-text-secondary);
        }
      }

      .game-logo {
        display: grid;
        grid-template-columns: repeat(2, 24px);
        gap: 2px;
        width: fit-content;
        margin: 0 auto 12px;
        padding: 7px;
        background: var(--color-primary-light);
        border: 1px solid var(--color-border-light);
        border-radius: var(--radius-lg);

        span {
          @include m.flex-center;

          font-size: 20px;
          font-weight: 800;
          color: var(--color-primary);

          &:nth-child(2),
          &:nth-child(3) {
            color: var(--color-secondary);
          }
        }
      }
    `,
  ],
  template: `
    <div class="setup-page">
      <div class="setup-container">
        <header class="setup-header">
          <h1>Tic Tac Toe</h1>
        </header>

        <section class="setup-card">
          <h2>Set Up Tournament</h2>
          <p class="card-description">Enter your details and get ready to play.</p>

          <app-setup-form (formSubmitted)="onTournamentStart($event)" />
        </section>
      </div>
    </div>
  `,
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
