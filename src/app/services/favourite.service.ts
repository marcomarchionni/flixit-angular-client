import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { MovieService } from './movie.service';
import { FavouriteIcon, Movie, User } from '../common/interfaces';
import { Observable, combineLatest, map, of, startWith, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FavouriteService {
  constructor(
    private userService: UserService,
    private movieService: MovieService,
    private http: HttpClient
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

  getFavouriteIcon(movieId: string): Observable<FavouriteIcon> {
    return this.userService.user$.pipe(
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
    if (this.userService.isUserFavourite(movie._id)) {
      this.userService.removeUserFavourite(movie._id).subscribe();
    } else {
      this.userService.addUserFavourite(movie._id).subscribe();
    }
  }

  private filterMoviesByFavoriteIds(
    movies: Movie[],
    favoriteIds: string[]
  ): Observable<Movie[]> {
    return of(movies.filter((movie) => favoriteIds.includes(movie._id)));
  }
}
