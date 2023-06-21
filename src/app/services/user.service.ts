import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  LoginResponse,
  User,
  UserDetails,
  UserLogin,
} from '../common/interfaces';
import { Observable, catchError, map, throwError } from 'rxjs';
import { apiUrl } from '../common/constants';
import { ErrorHandling } from '../errors/error-handling';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private err: ErrorHandling) {}

  loginUser(userLogin: UserLogin): Observable<any> {
    const params = new HttpParams()
      .set('username', userLogin.username)
      .set('password', userLogin.password);
    return this.http.post<LoginResponse>(apiUrl + 'login', {}, { params }).pipe(
      map((res) => {
        if (!res.user || !res.token) throwError;
        return res;
      }),
      catchError(this.err.handleError)
    );
  }

  signupUser(userDetails: UserDetails): Observable<any> {
    return this.http
      .post<User>(apiUrl + 'users', userDetails)
      .pipe(catchError(this.err.handleError));
  }
}
