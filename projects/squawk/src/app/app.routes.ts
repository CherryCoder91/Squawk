import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'development',
        loadComponent: () => import('../components/pages/development-page/development-page').then(m => m.DevelopmentPage)
    },
    {
        path: '**',
        redirectTo: 'development'
    }
];
