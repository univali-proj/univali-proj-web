import { Routes } from '@angular/router';
import { isMobile } from 'is-mobile';

export const routes: Routes = [
  {
    path: '',
    // Carrega a versão mobile ou desktop da página inicial conforme o aparelho
    loadComponent: () =>
      isMobile()
        ? import('./landing/landing-mobile').then((module) => module.LandingMobile)
        : import('./landing/landing').then((module) => module.Landing),
    title: 'Confitto',
  },
];
