import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./landing/landing').then((module) => module.Landing),
    title: 'Confitto',
  },
];
