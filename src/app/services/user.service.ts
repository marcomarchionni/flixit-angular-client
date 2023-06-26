import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, catchError, map, tap } from 'rxjs';
import { LoginCredentials, UserDetails } from '../common/interfaces';
import { ErrorHandling } from '../errors/error-handling';
import { ApiService } from './api.service';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private err: ErrorHandling,
    private userApiService: ApiService,
    private userStateService: StateService,
    private snackBar: MatSnackBar
  ) {}

  login(credentials: LoginCredentials): Observable<any> {
    return this.userApiService.login(credentials).pipe(
      tap((res) => {
        this.userStateService.setUser(res.user);
        this.userStateService.setToken(res.token);
      }),
      catchError(this.err.handleError)
    );
  }

  logout() {
    this.userStateService.resetUser();
    this.userStateService.resetToken();
    this.snackBar.open("You've been signed out", 'OK', {
      duration: 5000,
    });
  }

  signup(userDetails: UserDetails): Observable<any> {
    return this.userApiService
      .signup(userDetails)
      .pipe(catchError(this.err.handleError));
  }

  isLoggedIn() {
    return this.userStateService.getUser().pipe(map((user) => !!user));
  }

  getUsername() {
    return this.userStateService
      .getUser()
      .pipe(map((user) => (user ? user.username : '')));
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
}
