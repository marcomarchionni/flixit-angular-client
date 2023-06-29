import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-username-field',
  templateUrl: './username-field.component.html',
  styleUrls: ['./username-field.component.scss'],
})
export class UsernameFieldComponent implements OnInit {
  @Input()
  usernameControl!: FormControl;

  ngOnInit(): void {
    this.usernameControl.setValidators([
      Validators.required,
      Validators.minLength(4),
    ]);
  }
}
