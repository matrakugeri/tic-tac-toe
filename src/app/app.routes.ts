
import { Routes } from '@angular/router';
import { gameGuard } from './core/guards/game-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/main-layout/main-layout').then(m => m.MainLayout),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'setup',
      },
      {
        path: 'setup',
        loadComponent: () =>
          import('./pages/setup/setup').then(m => m.Setup),
      },
      {
        path: 'game',
        loadComponent: () =>
          import('./pages/game/game').then(m => m.Game),
        canActivate: [gameGuard],

      },
    ],
  },
  {
    path: '**',
    redirectTo: 'setup',
  },
];
