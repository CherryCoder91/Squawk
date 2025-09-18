import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = async (route, state) => {
    const supabaseService = inject(AuthService);
    const router = inject(Router);

    console.log('AuthGuard: Checking authentication status...');
    const user = await supabaseService.getUser();
    console.log(user);
    if (!supabaseService.currentUserSignal()) {
        router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
    return true;
};