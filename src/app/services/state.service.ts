import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Movie, User } from '../common/interfaces';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StateService {
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
