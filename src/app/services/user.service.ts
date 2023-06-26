import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  LoginResponse,
  Movie,
  User,
  UserDetails,
  LoginCredentials,
  UserUpdate,
} from '../common/interfaces';
import { BehaviorSubject, Observable, catchError, map, tap } from 'rxjs';
import { apiUrl } from '../common/constants';
import { ErrorHandling } from '../errors/error-handling';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _user$ = new BehaviorSubject<User | null>(null);

  get user$(): Observable<User | null> {
    return this._user$.asObservable();
  }

  constructor(
    private http: HttpClient,
    private err: ErrorHandling,
    private snackBar: MatSnackBar
  ) {
    this.init();
  }

  init(): void {
    const stringifiedUser = localStorage.getItem('user');
    if (stringifiedUser) {
      this._user$.next(JSON.parse(stringifiedUser));
    }
  }

  login(credentials: LoginCredentials): Observable<any> {
    const params = new HttpParams()
      .set('username', credentials.username)
      .set('password', credentials.password);
    return this.http.post<LoginResponse>(apiUrl + 'login', {}, { params }).pipe(
      tap((res) => {
        this._user$.next(res.user);
        // Save user and token to localstorage
        localStorage.setItem('user', JSON.stringify(res.user));
        localStorage.setItem('token', res.token);
      }),
      catchError(this.err.handleError)
    );
  }

  logout() {
    this._user$.next(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.snackBar.open("You've been signed out", 'OK', {
      duration: 5000,
    });
  }

  signup(userDetails: UserDetails): Observable<any> {
    return this.http
      .post<User>(apiUrl + 'users', userDetails)
      .pipe(catchError(this.err.handleError));
  }

  getUsername() {
    return this._user$.value?.username;
  }

  getFavouritesIds() {
    return this._user$.pipe(map((user) => (user ? user.favouriteMovies : [])));
  }

  isLoggedIn() {
    return this._user$.pipe(map((user) => !!user));
  }

  isUserFavourite(movieId: string) {
    return this._user$.value?.favouriteMovies.includes(movieId);
  }

  addUserFavourite(movieId: string): Observable<any> {
    const favouritesUrl = this.getFavouritesUrl(movieId);
    return this.http.put<User>(favouritesUrl, {}, this.getAuthHeaders()).pipe(
      tap((user) => {
        this._user$.next(user);
        localStorage.setItem('user', JSON.stringify(user));
      }),
      catchError(this.err.handleError)
    );
  }

  removeUserFavourite(movieId: string): Observable<any> {
    const removeFromFavouritesUrl = this.getFavouritesUrl(movieId);
    return this.http
      .delete<User>(removeFromFavouritesUrl, this.getAuthHeaders())
      .pipe(
        tap((user) => {
          this._user$.next(user);
          localStorage.setItem('user', JSON.stringify(user));
        }),
        catchError(this.err.handleError)
      );
  }

  // updateUser(userUpdate: UserUpdate): Observable<any> {
  //   const encodedUsername = encodeURIComponent(this.getUser().username);
  //   const updateUserUrl = `${apiUrl}users/${encodedUsername}`;
  //   return this.http
  //     .put<User>(updateUserUrl, userUpdate, this.getAuthHeaders())
  //     .pipe(catchError(this.err.handleError));
  // }

  // deleteUser(): Observable<any> {
  //   const encodedUsername = encodeURIComponent(this.getUser().username);
  //   const deleteUserUrl = `${apiUrl}users/${encodedUsername}`;
  //   return this.http
  //     .delete<User>(deleteUserUrl, this.getAuthHeaders())
  //     .pipe(catchError(this.err.handleError));
  // }

  private getFavouritesUrl(movieId: string) {
    const username = this._user$.value?.username;
    if (!username) throw new Error('No user found');
    const encodedUsername = encodeURIComponent(username);
    const encodedMovieId = encodeURIComponent(movieId);
    return `${apiUrl}users/${encodedUsername}/movies/${encodedMovieId}`;
  }

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token');
    return {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    };
  }
}
