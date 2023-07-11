import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../common/constants';
import {
  Director,
  Genre,
  LoginCredentials,
  LoginResponse,
  Movie,
  User,
  UserDetails,
} from '../common/interfaces';
import { AuthStateService } from './auth-state.service';

/**
 * ApiService is a service responsible for handling all API requests to the backend.
 * It contains methods to log in, sign up, manage favourites, and get movie data.
 *
 * Each method returns an Observable, which will be subscribed to in the components.
 *
 * @see HttpClient
 * @see Observable
 */
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private authStateService: AuthStateService
  ) {}

  login(credentials: LoginCredentials): Observable<LoginResponse> {
    const params = new HttpParams()
      .set('username', credentials.username)
      .set('password', credentials.password);
    return this.http.post<LoginResponse>(apiUrl + 'login', {}, { params });
  }

  signup(userDetails: UserDetails): Observable<User> {
    return this.http.post<User>(apiUrl + 'users', userDetails);
  }

  addFavourite(movieId: string): Observable<User> {
    const favouritesUrl = this.getFavouritesUrl(movieId);
    const authHeaders = this.getAuthHeaders();
    return this.http.put<User>(favouritesUrl, {}, authHeaders);
  }

  removeFavourite(movieId: string): Observable<User> {
    const removeFromFavouritesUrl = this.getFavouritesUrl(movieId);
    const authHeaders = this.getAuthHeaders();
    return this.http.delete<User>(removeFromFavouritesUrl, authHeaders);
  }

  getMovies() {
    return this.http.get<Movie[]>(apiUrl + 'movies', this.getAuthHeaders());
  }

  getMovie(title: string) {
    return this.http.get<Movie>(
      apiUrl + `movies/${title}`,
      this.getAuthHeaders()
    );
  }

  getMoviesByDirector(director: Director) {
    const encodedDirectorName = encodeURIComponent(director.name);
    const moviesByDirectorUrl = `${apiUrl}movies/directors/${encodedDirectorName}`;
    return this.http.get<Movie[]>(moviesByDirectorUrl, this.getAuthHeaders());
  }

  getMoviesByGenre(genre: Genre) {
    const encodedGenreName = encodeURIComponent(genre.name);
    const moviesByDirectorUrl = `${apiUrl}movies/genres/${encodedGenreName}`;
    return this.http.get<Movie[]>(moviesByDirectorUrl, this.getAuthHeaders());
  }

  getDirector(directorName: string): Observable<any> {
    const encodedName = encodeURIComponent(directorName);
    return this.http.get<Director>(
      apiUrl + `directors/${encodedName}`,
      this.getAuthHeaders()
    );
  }

  getGenre(genreName: string): Observable<Genre> {
    const encodedName = encodeURIComponent(genreName);
    return this.http.get<Genre>(
      `${apiUrl}genres/${encodedName}`,
      this.getAuthHeaders()
    );
  }

  private getFavouritesUrl(movieId: string) {
    const user = this.authStateService.getCurrentUser();
    if (!user) throw new Error('No user found');
    const encodedUsername = encodeURIComponent(user.username);
    const encodedMovieId = encodeURIComponent(movieId);
    return `${apiUrl}users/${encodedUsername}/movies/${encodedMovieId}`;
  }

  private getAuthHeaders() {
    const token = this.authStateService.getToken();
    if (!token) throw new Error('No token');
    return {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    };
  }
}
