import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Director, Genre } from '../common/interfaces';
import { ErrorHandling } from '../errors/error-handling';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private apiService: ApiService, private err: ErrorHandling) {}

  getMovies(): Observable<any> {
    return this.apiService.getMovies().pipe(catchError(this.err.handleError));
  }

  getMovie(title: string): Observable<any> {
    return this.apiService
      .getMovie(title)
      .pipe(catchError(this.err.handleError));
  }

  getMoviesByDirector(director: Director) {
    return this.apiService
      .getMoviesByDirector(director)
      .pipe(catchError(this.err.handleError));
  }

  getMoviesByGenre(genre: Genre) {
    return this.apiService
      .getMoviesByGenre(genre)
      .pipe(catchError(this.err.handleError));
  }

  getDirector(directorName: string): Observable<any> {
    return this.apiService
      .getDirector(directorName)
      .pipe(catchError(this.err.handleError));
  }

  getGenre(genreName: string): Observable<any> {
    return this.apiService
      .getGenre(genreName)
      .pipe(catchError(this.err.handleError));
  }
}
