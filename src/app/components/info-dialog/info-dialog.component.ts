import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MovieEntity } from 'src/app/common/interfaces';
import { DatePipe } from '@angular/common';

/**
 * InfoDialogComponent is a generic dialog component used to display information
 * about movie entities (stars, directors, and genres).
 *
 * This component is passed a data object containing an entity upon initialization,
 * which it then uses to populate the dialog.
 *
 * @property {T} entity - The entity (star, director, or genre) to be displayed.
 * @template T - Type parameter which extends MovieEntity.
 *
 * @see MovieEntity
 */
@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.scss'],
  providers: [DatePipe],
})
export class InfoDialogComponent<T extends MovieEntity> {
  entity!: T;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.entity = data.entity as T;
  }
}
