import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../common/interfaces';

/**
 * AuthStateService is a service responsible for managing the authentication state
 * of the user in the application. It maintains the current user and the associated
 * authentication token. User and token data are stored in local storage to persist
 * state across browser sessions.
 *
 * The service provides methods for setting, getting, and resetting the user and token.
 * It also helps to get authorization headers for HTTP requests, and get the favourite
 * movie IDs of the current user.
 *
 * @see BehaviorSubject
 * @see User
 */
@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  private user$ = new BehaviorSubject<User | null>(null);
  private token: string | null = null;

  constructor() {
    this.initUserAndToken();
  }

  initUserAndToken() {
    const localUser = localStorage.getItem('user');
    const localToken = localStorage.getItem('token');
    if (localUser && localToken) {
      this.user$.next(JSON.parse(localUser));
      this.token = localToken;
    } else {
      this.resetUser();
      this.resetToken();
    }
  }

  setUser(user: User) {
    this.user$.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  getUser() {
    return this.user$.asObservable();
  }

  getFavouriteIds() {
    return this.getUser().pipe(
      map((user) => (user ? user.favouriteMovies : []))
    );
  }

  getCurrentUser() {
    return this.user$.value;
  }

  getAuthHeaders() {
    if (!this.token) throw new Error('No token');
    return {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.token,
      }),
    };
  }

  resetUser() {
    this.user$.next(null);
    localStorage.removeItem('user');
  }

  resetToken() {
    this.token = null;
    localStorage.removeItem('token');
  }

  getToken() {
    return this.token;
  }
}
