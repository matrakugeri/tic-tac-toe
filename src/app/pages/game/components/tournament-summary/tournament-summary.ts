import { Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Scores, Player } from '../../../../core/models/game-model';

@Component({
  selector: 'app-tournament-summary',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="summary-card">
      <h2>Tournament Results</h2>
      <p class="winner-announcement">
        @if (isTournamentDraw()) {
          <strong>It's a Draw!</strong>
        } @else {
          Winner: {{ winner() }}
        }
      </p>
      <div class="final-stats">
        <div class="stat-box">
          <span>{{ player1().name }} ({{ player1().symbol }})</span>
          <strong>{{ scores().player1 }} {{ scores().player1 === 1 ? 'Win' : 'Wins' }}</strong>
        </div>
        <div class="stat-box">
          <span>Draws</span>
          <strong>{{ scores().draws }}</strong>
        </div>
        <div class="stat-box">
          <span>{{ player2().name }} ({{ player2().symbol }})</span>
          <strong>{{ scores().player2 }} {{ scores().player2 === 1 ? 'Win' : 'Wins' }}</strong>
        </div>
      </div>

      <div class="tournament-actions">
        <button class="secondary-button" (click)="setTournament.emit()">Set new tournament</button>
        <button class="primary-button" (click)="playAgain.emit()">Play Again</button>
      </div>
    </div>
  `,
  styles: [
    `
      @use 'mixins' as m;

      .summary-card {
        background: var(--color-background);
        border-radius: var(--radius-lg);
        padding: 2.5rem;
        box-shadow: var(--shadow-card-lg);
        max-width: 480px;
        width: 100%;
        margin: 2rem auto;
        text-align: center;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        animation: fadeInScale 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;

        h2 {
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--color-text);
          margin: 0;
        }

        .winner-announcement {
          font-size: 1.1rem;
          color: var(--color-primary);
          background: var(--color-background-secondary);
          padding: 0.75rem 1rem;
          border-radius: var(--radius-sm);
          margin: 0;
        }

        .tournament-actions {
          @include m.flex-center;
          gap: 8px;
        }

        .final-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin: 1rem 0;

          .stat-box {
            background: var(--color-background-secondary);
            border: 1px solid var(--color-border);
            border-radius: var(--radius-lg, 12px);
            padding: 1rem 0.5rem;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;

            span {
              font-size: 0.85rem;
              color: var(--color-text-secondary, #718096);
              font-weight: 500;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
      }

      @keyframes fadeInScale {
        0% {
          opacity: 0;
          transform: translateY(15px) scale(0.97);
        }
        100% {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }
    `,
  ],
})
export class TournamentSummaryComponent {
  player1 = input.required<Player>();
  player2 = input.required<Player>();
  scores = input.required<Scores>();
  winner = input.required<string | null>();

  setTournament = output<void>();
  playAgain = output<void>();

  readonly isTournamentDraw = computed(() => this.winner() === 'Draw');
}
