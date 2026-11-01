import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Scores, Player } from "../../../../core/models/game-model";

@Component({
  selector: 'app-tournament-summary',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="summary-card">
      <h2>Tournament Results</h2>
      <p class="winner-announcement">Winner: <strong>{{ winner() }}</strong></p>

      <div class="final-stats">
        <div class="stat-box">
          <span>{{ player1().name }} ({{ player1().symbol }})</span>
          <strong>{{ scores().player1 }} Wins</strong>
        </div>
        <div class="stat-box">
          <span>Draws</span>
          <strong>{{ scores().draws }}</strong>
        </div>
        <div class="stat-box">
          <span>{{ player2().name }} ({{ player2().symbol }})</span>
          <strong>{{ scores().player2 }} Wins</strong>
        </div>
      </div>

      <button class="action-button primary" (click)="playAgain.emit()">
        Play Again
      </button>
    </div>
  `,
  styles:[`
    .summary-card {
  background: var(--card-background, #ffffff);
  border-radius: var(--border-radius-lg, 16px);
  padding: 2.5rem;
  box-shadow: var(--shadow-lg, 0 10px 25px rgba(0, 0, 0, 0.08));
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
    color: var(--text-primary, #1a1a1a);
    margin: 0;
  }

  .winner-announcement {
    font-size: 1.1rem;
    color: var(--text-secondary, #4a5568);
    background: var(--bg-secondary, #f7fafc);
    padding: 0.75rem 1rem;
    border-radius: var(--border-radius-sm, 8px);
    margin: 0;

    strong {
      color: var(--primary-color, #2b6cb0);
      font-weight: 600;
    }
  }

  .final-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin: 1rem 0;

    .stat-box {
      background: var(--bg-secondary, #f8fafc);
      border: 1px solid var(--border-color, #e2e8f0);
      border-radius: var(--border-radius-md, 12px);
      padding: 1rem 0.5rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      span {
        font-size: 0.85rem;
        color: var(--text-muted, #718096);
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      strong {
        font-size: 1.25rem;
        color: var(--text-primary, #2d3748);
        font-weight: 700;
      }
    }
  }

  .action-button {
    background-color: var(--primary-color, #3182ce);
    color: white;
    border: none;
    border-radius: var(--border-radius-sm, 8px);
    padding: 0.85rem 1.5rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s ease, transform 0.1s ease;
    width: 100%;

    &:hover {
      background-color: var(--primary-hover, #2b6cb0);
    }

    &:active {
      transform: scale(0.98);
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
}`]
})
export class TournamentSummaryComponent {
  player1 = input.required<Player>();
  player2 = input.required<Player>();
  scores = input.required<Scores>();
  winner = input.required<string | null>();
  
  playAgain = output<void>();
}