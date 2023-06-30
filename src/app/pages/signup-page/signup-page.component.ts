import { Component, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import { UserDetails } from '../../common/interfaces';

/**
 * SignupPageComponent allows a new user to create an account.
 * It provides a form for entering username, password, email, and optional birthday.
 *
 * @property {FormGroup} signupForm - The form for user signup.
 * @property {FormGroupDirective} formGroupDirective - A directive to control the form and reset it after successful submission.
 *
 * @see UserService
 * @see MatSnackBar
 */
@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
})
export class SignupPageComponent {
  @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;

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

  /**
   * Handles the form submission. Calls the UserService's signup method with the form values.
   * Upon successful registration, it resets the form and shows a success notification.
   */
  onSubmit(): void {
    const userDetails: UserDetails = this.getUserDetails(this.signupForm.value);
    this.userService.signup(userDetails).subscribe({
      next: (response) => {
        console.log(response);
        // TODO: logic for user registration
        this.snackBar.open('User registration successful!', 'OK', {
          duration: 2000,
        });
        this.signupForm.reset();
        this.formGroupDirective.resetForm();
      },
      error: (error) => {
        console.log(error);
        this.snackBar.open(error, 'OK', { duration: 5000 });
      },
    });
  }

  private getUserDetails(formValue: any): UserDetails {
    return {
      username: formValue.username!,
      password: formValue.password!,
      email: formValue.email!,
      birthday: formValue.birthday || undefined,
    };
  }
}
