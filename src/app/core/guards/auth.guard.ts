import { inject } from '@angular/core';

import { AuthService } from '../services/auth/auth.service';
import { Router, type CanActivateFn } from '@angular/router';
export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }

  router.navigate(['/'], {});
  return false;
};
