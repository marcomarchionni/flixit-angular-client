import { Component } from '@angular/core';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'flixit-angular-client';

  constructor(public dialog: MatDialog) {}

  openUserRegistrationDialog() {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px',
    });
  }

  openLoginDialog() {
    this.dialog.open(UserLoginFormComponent, { width: '280px' });
  }
}
