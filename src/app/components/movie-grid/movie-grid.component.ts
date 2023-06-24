import { Component } from '@angular/core';
import { Movie } from '../../common/interfaces';
import { FetchApiDataService } from '../../services/fetch-api-data.service';

@Component({
  selector: 'app-movie-grid',
  templateUrl: './movie-grid.component.html',
  styleUrls: ['./movie-grid.component.scss'],
})
export class MovieGridComponent {
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
