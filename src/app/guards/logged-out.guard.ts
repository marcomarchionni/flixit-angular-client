import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

/**
 * The loggedOutGuard checks if a user is currently logged in. If the user is logged in,
 * the guard performs a logout operation before allowing the navigation.
 * If the user is not logged in, it simply allows the navigation.
 *
 * @returns An Observable that emits a boolean value indicating if the route can be activated (true) or not (false).
 * @see UserService
 * @see Router
 */
export const loggedOutGuard: CanActivateFn = () => {
  const userService = inject(UserService);
  return userService.isLoggedIn().pipe(
    map((isLoggedIn: boolean) => {
      if (isLoggedIn) {
        userService.logout();
      }
      return true;
    })
  );
};
