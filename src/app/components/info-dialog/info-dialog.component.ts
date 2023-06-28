import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MovieEntity } from 'src/app/common/interfaces';
import { DatePipe } from '@angular/common';

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
