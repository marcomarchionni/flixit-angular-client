import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { MovieService } from './movie.service';
import { Movie } from '../common/interfaces';
import { Observable, combineLatest, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavouriteService {
  constructor(
    private userService: UserService,
    private movieService: MovieService
  ) {}

  getFavoriteMovies(): Observable<Movie[]> {
    return combineLatest([
      this.movieService.getMovies(),
      this.userService.getFavouritesIds(),
    ]).pipe(
      switchMap(([movies, favoriteIds]) =>
        this.filterMoviesByFavoriteIds(movies, favoriteIds)
      )
    );
  }

  private filterMoviesByFavoriteIds(
    movies: Movie[],
    favoriteIds: string[]
  ): Observable<Movie[]> {
    return of(movies.filter((movie) => favoriteIds.includes(movie._id)));
  }
}
