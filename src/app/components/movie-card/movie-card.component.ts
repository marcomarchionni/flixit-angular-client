import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FavouriteIcon, Movie } from 'src/app/common/interfaces';
import { FavouriteService } from 'src/app/services/favourite.service';

/**
 * MovieCardComponent represents an individual movie card within a grid of movies.
 * Each movie card provides basic information about a movie and allows the user to mark it as favourite.
 *
 * @property {Movie} movie - The movie information to display.
 * @property {Observable<FavouriteIcon>} favouriteIcon$ - The favourite icon observable.
 *
 * @see Movie
 * @see FavouriteIcon
 */
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  @Input() movie!: Movie;
  favouriteIcon$: Observable<FavouriteIcon> | undefined;

  constructor(
    private favouriteService: FavouriteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.favouriteIcon$ = this.favouriteService.getFavouriteIcon(
      this.movie._id
    );
  }

  toggleFavourite() {
    this.favouriteService.toggleFavourite(this.movie);
  }

  goToInfo() {
    this.router.navigateByUrl('movies/' + this.movie._id);
  }
}
