import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs';
import { GameStateService } from '../services/game-state';
import { GameStatus } from '../models/game-model';

export const gameGuard: CanActivateFn = (route, state) => {
  const gameStateService = inject(GameStateService);
  const router = inject(Router);

  return gameStateService.state$.pipe(
    take(1),
    map(gameState => {
      if (gameState.status === GameStatus.SETUP) {
        return router.createUrlTree(['/']);
      }
      return true;
    })
  );
};