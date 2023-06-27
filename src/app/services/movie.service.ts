import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, shareReplay } from 'rxjs/operators';
import { Director, Genre, Movie } from '../common/interfaces';
import { ErrorHandling } from '../errors/error-handling';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private movies$: Observable<Movie[]> | undefined;

  constructor(private apiService: ApiService, private err: ErrorHandling) {}

  getMovies(): Observable<Movie[]> {
    if (!this.movies$) {
      this.movies$ = this.apiService.getMovies().pipe(
        shareReplay({ bufferSize: 1, refCount: true }),
        catchError((err) => {
          this.err.handleError(err);
          return of([] as Movie[]);
        })
      );
    }
    return this.movies$;
  }

  getMovie(title: string): Observable<any> {
    return this.apiService
      .getMovie(title)
      .pipe(catchError(this.err.handleError));
  }

  getMovieById(movieId: string) {
    return this.getMovies().pipe(
      map((movies: Movie[]) => {
        const movie = movies.find((movie) => movie._id === movieId);
        if (!movie) throw new Error('Movie not found');
        return movie;
      })
    );
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
