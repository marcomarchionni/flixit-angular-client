import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FavouriteIcon, Movie } from 'src/app/common/interfaces';
import { FavouriteService } from 'src/app/services/favourite.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  @Input() movie!: Movie;
  favouriteIcon$: Observable<FavouriteIcon> | undefined;

  constructor(private favouriteService: FavouriteService) {}

  ngOnInit(): void {
    this.favouriteIcon$ = this.favouriteService.getFavouriteIcon(
      this.movie._id
    );
  }

  toggleFavourite() {
    this.favouriteService.toggleFavourite(this.movie);
  }
}
