import { Routes } from '@angular/router';
import { gameGuard } from './core/guards/game-guard';
import { setupGuard } from './core/guards/setup-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/main-layout/main-layout').then((m) => m.MainLayout),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'setup',
      },
      {
        path: 'setup',
        loadComponent: () => import('./pages/setup/setup').then((m) => m.Setup),
        canActivate: [setupGuard],
      },
      {
        path: 'game',
        loadComponent: () => import('./pages/game/game').then((m) => m.Game),
        canActivate: [gameGuard],
        // canDeactivate: [gameDeactivateGuard],
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'setup',
  },
];
