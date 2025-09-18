import { Routes } from '@angular/router';
import { authGuard } from '../guards/auth.guard';

export const routes: Routes = [
    {
        path: 'development',
        loadComponent: () => import('../components/pages/development-page/development-page').then(m => m.DevelopmentPage),
        canActivate: [authGuard]
    },
    {
        path: 'development-2',
        loadComponent: () => import('../components/pages/development-page-2/development-page-2').then(m => m.DevelopmentPage2),
        canActivate: [authGuard]
    },
    {
        path: 'development-3',
        loadComponent: () => import('../components/pages/development-page-3/development-page-3').then(m => m.DevelopmentPage3),
        canActivate: [authGuard]
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
        redirectTo: 'login'
    }
];
