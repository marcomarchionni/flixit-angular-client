import { Component, Input } from '@angular/core';
import { Movie } from '../../common/interfaces';

/**
 * MovieGridComponent is responsible for rendering a grid of movie cards.
 * Movie infos are displayed inside a MovieCardComponent.
 *
 * @property {Movie[]} movies - An array of Movie objects to be displayed as a grid.
 *
 * @see Movie
 */
@Component({
  selector: 'app-movie-grid',
  templateUrl: './movie-grid.component.html',
  styleUrls: ['./movie-grid.component.scss'],
})
export class MovieGridComponent {
  @Input() movies!: Movie[];
}
