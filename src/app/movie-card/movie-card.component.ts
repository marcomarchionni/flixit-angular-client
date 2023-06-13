import { Component } from '@angular/core';
import { Movie } from '../interfaces';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  movies: Movie[] = [];

  constructor(public fetchApiData: FetchApiDataService) {}

  ngOnInit() {
    this.getMovies();
  }

  getMovies() {
    this.fetchApiData.getAllMovies().subscribe((data) => {
      this.movies = data;
      console.log(this.movies);
    });
  }
}
