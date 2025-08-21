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
        path: 'login',
        loadComponent: () => import('../components/pages/login-page/login-page').then(m => m.LoginPage)
    },
    {
        path: 'register',
        loadComponent: () => import('../components/pages/register-page/register-page').then(m => m.RegisterPage)
    },
    {
        path: '**',
        redirectTo: 'register'
    }
];
