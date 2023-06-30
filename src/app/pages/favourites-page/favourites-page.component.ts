import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/common/interfaces';
import { FavouriteService } from 'src/app/services/favourite.service';

/**
 * FavouritesPageComponent utilizes the MovieGridComponent and the
 * MovieCardComponent to displays the user's favourite movies.
 * It leverages the FavouriteService to fetch the favourite movie
 * data from the backend.
 *
 * @property {Movie[]} favourites - Holds the array of Movie objects that represent the user's favourite movies.
 *
 * @see Movie
 * @see FavouriteService
 */
@Component({
  selector: 'app-favourites-page',
  templateUrl: './favourites-page.component.html',
  styleUrls: ['./favourites-page.component.scss'],
})
export class FavouritesPageComponent implements OnInit {
  favourites: Movie[] = [];

  constructor(private favouriteService: FavouriteService) {}

  ngOnInit(): void {
    this.favouriteService
      .getFavoriteMovies()
      .subscribe((movies) => (this.favourites = movies));
  }
}
