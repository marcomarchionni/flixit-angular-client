import { Component, Input } from '@angular/core';
import { Movie } from '../../common/interfaces';

@Component({
  selector: 'app-movie-grid',
  templateUrl: './movie-grid.component.html',
  styleUrls: ['./movie-grid.component.scss'],
})
export class MovieGridComponent {
  @Input() movies!: Movie[];
}
