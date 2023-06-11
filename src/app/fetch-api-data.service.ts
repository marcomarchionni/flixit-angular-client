import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import {
  Director,
  Genre,
  Movie,
  User,
  UserDetails,
  UserUpdate,
} from './interfaces';

// Declaring the API url
const apiUrl = 'https://itflix-api.herokuapp.com/';

@Injectable({
  providedIn: 'root',
})
export class UserRegistrationService {
  // Inject HttpClient in the constructor
  constructor(private http: HttpClient) {}

  userSignup(userDetails: UserDetails): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  userLogin(username: string, password: string): Observable<any> {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password);
    return this.http
      .post(apiUrl + 'login', {}, { params })
      .pipe(catchError(this.handleError));
  }

  getAllMovies(): Observable<any> {
    return this.http
      .get<Movie[]>(apiUrl + 'movies', this.getAuthHeader())
      .pipe(catchError(this.handleError));
  }

  getMovie(title: string): Observable<any> {
    return this.http
      .get<Movie>(apiUrl + `movies/${title}`, this.getAuthHeader())
      .pipe(
        map((movie) => movie as Movie),
        catchError(this.handleError)
      );
  }

  getMoviesByDirector(director: Director) {
    const encodedDirectorName = encodeURIComponent(director.name);
    const moviesByDirectorUrl = `${apiUrl}movies/directors/${encodedDirectorName}`;
    return this.http
      .get<Movie[]>(moviesByDirectorUrl)
      .pipe(catchError(this.handleError));
  }

  getMoviesByGenre(genre: Genre) {
    const encodedGenreName = encodeURIComponent(genre.name);
    const moviesByDirectorUrl = `${apiUrl}movies/directors/${encodedGenreName}`;
    return this.http
      .get<Movie[]>(moviesByDirectorUrl)
      .pipe(catchError(this.handleError));
  }

  getDirector(directorName: string): Observable<any> {
    const encodedName = encodeURIComponent(directorName);
    return this.http
      .get(apiUrl + `directors/${encodedName}`)
      .pipe(catchError(this.handleError));
  }

  getGenre(genreName: string): Observable<any> {
    const encodedName = encodeURIComponent(genreName);
    return this.http
      .get(apiUrl + `genres/${encodedName}`)
      .pipe(catchError(this.handleError));
  }

  addMovieToFavourites(movie: Movie): Observable<any> {
    // get movies from localStorage
    const user = this.getLocalUser();
    if (!user) throw new Error('No user found');

    // update user on backend
    const encodedUsername = encodeURIComponent(user.username);
    const encodedMovieId = encodeURIComponent(movie._id);
    const addToFavouritesUrl = `${apiUrl}users/${encodedUsername}/movies/${encodedMovieId}`;
    return this.http.put<User>(addToFavouritesUrl, {}).pipe(
      tap((user: User) => this.saveLocalUser(user)),
      catchError(this.handleError)
    );
  }

  removeMovieFromFavourites(movie: Movie): Observable<any> {
    // get movies from localStorage
    const user = this.getLocalUser();
    if (!user) throw new Error('No user found');

    // update user on backend
    const encodedUsername = encodeURIComponent(user.username);
    const encodedMovieId = encodeURIComponent(movie._id);
    const removeFromFavouritesUrl = `${apiUrl}users/${encodedUsername}/movies/${encodedMovieId}`;
    return this.http.delete<User>(removeFromFavouritesUrl).pipe(
      tap((user: User) => this.saveLocalUser(user)),
      catchError(this.handleError)
    );
  }

  updateUser(user: User, userUpdate: UserUpdate): Observable<any> {
    const encodedUsername = encodeURIComponent(user.username);
    const updateUserUrl = `${apiUrl}users/${encodedUsername}`;
    return this.http.put<User>(updateUserUrl, userUpdate).pipe(
      tap((user: User) => this.saveLocalUser(user)),
      catchError(this.handleError)
    );
  }

  deleteUser(user: User): Observable<any> {
    const encodedUsername = encodeURIComponent(user.username);
    const deleteUserUrl = `${apiUrl}users/${encodedUsername}`;
    return this.http
      .delete<User>(deleteUserUrl)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status Code ${error.status},` + `Error Body is: ${error.error}`
      );
    }
    return throwError(() => new Error('Something bad happened, try later'));
  }

  private getAuthHeader() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    };
  }

  private getLocalUser(): User | null {
    const stringifiedUser = localStorage.getItem('user');
    if (stringifiedUser) return JSON.parse(stringifiedUser);
    else return null;
  }

  private saveLocalUser(user: User) {
    const stringifiedUser = JSON.stringify(user);
    localStorage.setItem('user', stringifiedUser);
  }

  private extractResponseData(res: Response): any {
    const body = res;
    return body || {};
  }
}
