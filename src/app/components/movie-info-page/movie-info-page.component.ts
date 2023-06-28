import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FavouriteIcon, Movie, MovieEntity } from 'src/app/common/interfaces';
import { InfoDialogComponent } from 'src/app/components/info-dialog/info-dialog.component';
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
    private dialog: MatDialog,
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

  openInfoDialog<T extends MovieEntity>(entity: T) {
    const dialogRef = this.dialog.open(InfoDialogComponent, {
      width: '300px',
      data: { entity },
    });
  }
}
