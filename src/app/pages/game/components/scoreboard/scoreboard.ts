import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Player, Scores, PlayerSymbol, GameStatus } from '../../../../core/models/game-model';

@Component({
  selector: 'app-scoreboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="scoreboard">
      <div class="score-card" [class.active-turn]="currentTurn() === player1().symbol && status() === GameStatus.IN_PROGRESS">
        <span class="player-name">{{ player1().name }}</span>
        <span class="player-symbol symbol-x">{{ player1().symbol }}</span>
        <span class="player-score">{{ scores().player1 }}</span>
      </div>

      <div class="score-card draws">
        <span class="player-name">Draws</span>
        <span class="player-symbol draw-symbol">-</span>
        <span class="player-score">{{ scores().draws }}</span>
      </div>

      <div class="score-card" [class.active-turn]="currentTurn() === player2().symbol && status() === GameStatus.IN_PROGRESS">
        <span class="player-name">{{ player2().name }}</span>
        <span class="player-symbol symbol-o">{{ player2().symbol }}</span>
        <span class="player-score">{{ scores().player2 }}</span>
      </div>
    </div>
  `,
  styles:[`
    @use 'mixins' as m;

:host {
  display: block;
  width: 100%;
}

.scoreboard {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  width: 100%;
}

.score-card {
  @include m.card;
  padding: 14px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  border: 1.5px solid var(--color-border);
  transition: all var(--transition-fast);

  &.active-turn {
    border-color: var(--color-primary);
    background: var(--color-primary-light);
    box-shadow: 0 0 0 2px rgba(101, 69, 191, 0.15);
  }

  .player-name {
    font-size: 12px;
    font-weight: 600;
    color: var(--color-text-secondary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }

  .player-symbol {
    font-size: 16px;
    font-weight: 800;

    &.symbol-x { color: var(--color-primary); }
    &.symbol-o { color: var(--color-secondary); }
    &.draw-symbol { color: var(--color-text-muted); }
  }

  .player-score {
    font-size: 22px;
    font-weight: 800;
    color: var(--color-text);
  }
}`]
})
    export class ScoreboardComponent {
      readonly player1 = input.required<Player>();
      readonly player2 = input.required<Player>();
      readonly scores = input.required<Scores>();
      readonly currentTurn = input.required<PlayerSymbol>();
      readonly status = input.required<GameStatus>();

      readonly GameStatus = GameStatus;
    }