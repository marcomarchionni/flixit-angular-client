import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { LoginCredentials, LoginResponse } from '../../common/interfaces';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  usernameControl = new FormControl('');
  passwordControl = new FormControl('');
  loginForm = new FormGroup({
    username: this.usernameControl,
    password: this.passwordControl,
  });

  constructor(
    private userService: UserService,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  onSubmit() {
    const loginCredentials: LoginCredentials = {
      username: this.loginForm.value.username!,
      password: this.loginForm.value.password!,
    };
    console.log({ loginCredentials });
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
