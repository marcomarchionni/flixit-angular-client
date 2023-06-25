import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/common/interfaces';
import { FavouriteService } from 'src/app/services/favourite.service';

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
