import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { map } from 'rxjs';

/**
 * The loggedInGuard checks if a user is currently logged in. If the user is logged in, the guard allows navigation.
 * If the user is not logged in, the guard redirects the user to the login page and cancels the current navigation.
 *
 * @returns An Observable that emits a boolean value indicating if the route can be activated (true) or not (false).
 * @see UserService
 * @see Router
 */
export const loggedInGuard: CanActivateFn = () => {
  const userService = inject(UserService);
  const router = inject(Router);
  return userService.isLoggedIn().pipe(
    map((isLoggedIn: boolean) => {
      if (isLoggedIn) {
        return true;
      } else {
        router.navigateByUrl('login');
        return false;
      }
    })
  );
};
