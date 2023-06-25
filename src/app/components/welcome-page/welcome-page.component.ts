import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignupPageComponent } from '../signup-page/signup-page.component';
import { LoginPageComponent } from '../login-page/login-page.component';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openUserRegistrationDialog() {
    this.dialog.open(SignupPageComponent, { width: '280px' });
  }

  openUserLoginDialog() {
    this.dialog.open(LoginPageComponent, { width: '280px' });
  }
}
