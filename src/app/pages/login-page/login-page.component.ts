import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { LoginCredentials, LoginResponse } from '../../common/interfaces';

/**
 * LoginPageComponent allows the users to log into the application.
 * It contains a form where users can input their username and password.
 *
 * @property {FormGroup} loginForm - Form for the username and password input.
 *
 * @see UserService
 * @see MatSnackBar
 * @see Router
 */
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),

    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  constructor(
    private userService: UserService,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  /**
   * Handles the form submission. Calls the login method from UserService.
   * In case of success, it navigates to the 'movies' route.
   * In case of error, it displays a snack-bar with the error message.
   */
  onSubmit() {
    const loginCredentials: LoginCredentials = {
      username: this.loginForm.value.username!,
      password: this.loginForm.value.password!,
    };
    this.userService.login(loginCredentials).subscribe({
      next: (response: LoginResponse) => {
        console.log({ response });
        this.snackBar.open('User login successful!', 'OK', {
          duration: 5000,
        });
        this.router.navigate(['movies']);
      },
      error: (error) => {
        console.log(error);
        this.snackBar.open(error, 'OK', { duration: 5000 });
      },
    });
  }
}
