import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'development',
        loadComponent: () => import('../components/pages/development-page/development-page').then(m => m.DevelopmentPage)
    },
    {
        path: 'development-2',
        loadComponent: () => import('../components/pages/development-page-2/development-page-2').then(m => m.DevelopmentPage2)
    },
    {
        path: '**',
        redirectTo: 'development-2'
    }
];
