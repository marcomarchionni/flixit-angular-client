import { Injectable } from '@angular/core';
import {
  Observable,
  catchError,
  combineLatest,
  map,
  of,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { FavouriteIcon, Movie } from '../common/interfaces';
import { ErrorHandling } from '../errors/error-handling';
import { MovieService } from './movie.service';
import { ApiService } from './api.service';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root',
})
export class FavouriteService {
  constructor(
    private userStateService: StateService,
    private movieService: MovieService,
    private userApiService: ApiService,
    private err: ErrorHandling
  ) {}

  getFavoriteMovies(): Observable<Movie[]> {
    return combineLatest([
      this.movieService.getMovies(),
      this.userStateService.getFavouriteIds(),
    ]).pipe(
      switchMap(([movies, favoriteIds]) =>
        this.filterMoviesByFavoriteIds(movies, favoriteIds)
      )
    );
  }

  getFavouriteIcon(movieId: string): Observable<FavouriteIcon> {
    return this.userStateService.getUser().pipe(
      map((user) => {
        if (user && user.favouriteMovies.includes(movieId)) {
          return 'favorite';
        }
        return 'favorite_border';
      }),
      startWith('favorite_border' as FavouriteIcon)
    );
  }

  toggleFavourite(movie: Movie) {
    if (this.isUserFavourite(movie._id)) {
      this.removeFavourite(movie._id).subscribe();
    } else {
      this.addFavourite(movie._id).subscribe();
    }
  }

  private filterMoviesByFavoriteIds(
    movies: Movie[],
    favoriteIds: string[]
  ): Observable<Movie[]> {
    return of(movies.filter((movie) => favoriteIds.includes(movie._id)));
  }

  private isUserFavourite(movieId: string) {
    return this.userStateService
      .getCurrentUser()
      ?.favouriteMovies.includes(movieId);
  }

  private addFavourite(movieId: string): Observable<any> {
    return this.userApiService.addFavourite(movieId).pipe(
      tap((user) => {
        this.userStateService.setUser(user);
      }),
      catchError(this.err.handleError)
    );
  }

  private removeFavourite(movieId: string): Observable<any> {
    return this.userApiService.removeFavourite(movieId).pipe(
      tap((user) => {
        this.userStateService.setUser(user);
      }),
      catchError(this.err.handleError)
    );
  }
}
