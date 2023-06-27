import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/common/interfaces';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movies-page',
  templateUrl: './movies-page.component.html',
  styleUrls: ['./movies-page.component.scss'],
})
export class MoviesPageComponent implements OnInit {
  movies: Movie[] = [];

  constructor(public movieService: MovieService) {}

  ngOnInit() {
    this.getMovies();
  }

  getMovies() {
    this.movieService.getMovies().subscribe((data) => {
      this.movies = data;
    });
  }
}
