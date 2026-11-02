import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs';
import { GameStateService } from '../services/game/game-state';
import { GameStatus } from '../models/game-model';

export const setupGuard: CanActivateFn = () => {
  const gameStateService = inject(GameStateService);
  const router = inject(Router);

  return gameStateService.state$.pipe(
    take(1),
    map((gameState) => {
      if (
        gameState.status === GameStatus.IN_PROGRESS ||
        gameState.status === GameStatus.TOURNAMENT_COMPLETE
      ) {
        return router.createUrlTree(['/game']);
      }
      return true;
    }),
  );
};
