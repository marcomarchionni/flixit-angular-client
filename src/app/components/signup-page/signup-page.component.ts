import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieService } from '../../services/movie.service';
import { UserDetails } from '../../common/interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
})
export class SignupPageComponent {
  signupForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    birthday: new FormControl(''),
  });

  constructor(public userService: UserService, public snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.userService.signup(this.signupForm.value as UserDetails).subscribe({
      next: (response) => {
        console.log(response);
        // TODO: logic for user registration
        this.snackBar.open('User registration successful!', 'OK', {
          duration: 2000,
        });
      },
      error: (error) => {
        console.log(error);
        this.snackBar.open(error, 'OK', { duration: 5000 });
      },
    });
  }
}
