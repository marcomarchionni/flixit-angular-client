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
import { AuthStateService } from './auth-state.service';

/**
 * The FavouriteService is a service that handles user favorites. It provides functions
 * to get all favorite movies of a user, toggle (add or remove) a favorite movie, and
 * get the favorite icon state (filled or outlined) for a specific movie.
 *
 * It leverages services such as the MovieService, ApiService and AuthStateService
 * to fetch movies, interact with the API and manage the state of user authentication
 * respectively. It also makes use of the ErrorHandling service for handling any errors
 * that may occur during API requests.
 *
 * @see MovieService
 * @see ApiService
 * @see AuthStateService
 * @see ErrorHandling
 */
@Injectable({
  providedIn: 'root',
})
export class FavouriteService {
  constructor(
    private userStateService: AuthStateService,
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
