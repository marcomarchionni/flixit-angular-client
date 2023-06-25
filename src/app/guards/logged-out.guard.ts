import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

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
