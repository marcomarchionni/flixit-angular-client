import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  Director,
  Genre,
  LoginResponse,
  Movie,
  User,
  UserDetails,
  LoginCredentials,
  UserUpdate,
} from '../common/interfaces';

// Declaring the API url
const apiUrl = 'https://itflix-api.herokuapp.com/';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  // Inject HttpClient in the constructor
  constructor(private http: HttpClient) {}

  getMovies(): Observable<any> {
    return this.http
      .get<Movie[]>(apiUrl + 'movies', this.getAuthHeaders())
      .pipe(catchError(this.handleError));
  }

  getMovie(title: string): Observable<any> {
    return this.http
      .get<Movie>(apiUrl + `movies/${title}`, this.getAuthHeaders())
      .pipe(catchError(this.handleError));
  }

  getMoviesByDirector(director: Director) {
    const encodedDirectorName = encodeURIComponent(director.name);
    const moviesByDirectorUrl = `${apiUrl}movies/directors/${encodedDirectorName}`;
    return this.http
      .get<Movie[]>(moviesByDirectorUrl, this.getAuthHeaders())
      .pipe(catchError(this.handleError));
  }

  getMoviesByGenre(genre: Genre) {
    const encodedGenreName = encodeURIComponent(genre.name);
    const moviesByDirectorUrl = `${apiUrl}movies/genres/${encodedGenreName}`;
    return this.http
      .get<Movie[]>(moviesByDirectorUrl, this.getAuthHeaders())
      .pipe(catchError(this.handleError));
  }

  getDirector(directorName: string): Observable<any> {
    const encodedName = encodeURIComponent(directorName);
    return this.http
      .get<Director>(apiUrl + `directors/${encodedName}`, this.getAuthHeaders())
      .pipe(catchError(this.handleError));
  }

  getGenre(genreName: string): Observable<any> {
    const encodedName = encodeURIComponent(genreName);
    return this.http
      .get<Genre>(`${apiUrl}genres/${encodedName}`, this.getAuthHeaders())
      .pipe(catchError(this.handleError));
  }

  addMovieToFavourites(user: User, movie: Movie): Observable<any> {
    const encodedUsername = encodeURIComponent(user.username);
    const encodedMovieId = encodeURIComponent(movie._id);
    const addToFavouritesUrl = `${apiUrl}users/${encodedUsername}/movies/${encodedMovieId}`;
    return this.http
      .put<User>(addToFavouritesUrl, {}, this.getAuthHeaders())
      .pipe(catchError(this.handleError));
  }

  removeMovieFromFavourites(user: User, movie: Movie): Observable<any> {
    const encodedUsername = encodeURIComponent(user.username);
    const encodedMovieId = encodeURIComponent(movie._id);
    const removeFromFavouritesUrl = `${apiUrl}users/${encodedUsername}/movies/${encodedMovieId}`;
    return this.http
      .delete<User>(removeFromFavouritesUrl, this.getAuthHeaders())
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): any {
    let message: string;
    let status: string;
    console.log(error);
    if (error.error && error.error.status && error.error.message) {
      status = `${error.error.status}`;
      message = error.error.message;
    } else if (error.status && error.message) {
      status = `${error.status}`;
      message = error.message;
    } else {
      status = '---';
      message = 'Unknown error';
    }
    console.error(`Error Status: ${status},` + `Error message: ${message}`);
    return throwError(() => new Error(message));
  }

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    if (!token) throwError(() => new Error('No token'));
    return {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    };
  }
}
