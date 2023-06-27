import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { FavouriteIcon, Movie } from 'src/app/common/interfaces';
import { FavouriteService } from 'src/app/services/favourite.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-info-page',
  templateUrl: './movie-info-page.component.html',
  styleUrls: ['./movie-info-page.component.scss'],
})
export class MovieInfoPageComponent implements OnInit {
  movie!: Movie;
  favouriteIcon$: Observable<FavouriteIcon> | undefined;

  constructor(
    private route: ActivatedRoute,
    private favouriteService: FavouriteService,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const movieId = params.get('movieId');
      if (!movieId) throw new Error('Page not found');
      this.favouriteIcon$ = this.favouriteService.getFavouriteIcon(movieId);
      this.movieService
        .getMovieById(movieId)
        .subscribe({ next: (movie: Movie) => (this.movie = movie) });
    });
  }

  toggleFavourite() {
    this.favouriteService.toggleFavourite(this.movie);
  }
}
