import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/common/interfaces';
import { MovieService } from 'src/app/services/movie.service';

/**
 * MoviesPageComponent is a component that serves as the main page for the application.
 * It incorporates the MovieGridComponent and MovieCardComponent to display a collection of movies.
 * Movies are fetched from the backend via the MovieService.
 *
 * @property {Movie[]} movies - An array of Movie objects to hold the list of movies.
 *
 * @see Movie
 * @see MovieService
 */
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
