import { Component, Input } from '@angular/core';
import { LoginResponse, UserLogin } from '../interfaces';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent {
  @Input() userData: UserLogin = {
    username: '',
    password: '',
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  loginUser() {
    this.fetchApiData.loginUser(this.userData).subscribe(
      (response: LoginResponse) => {
        console.log(response);

        //save to local storage
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('token', response.token);

        // close dialog
        this.dialogRef.close();
        this.snackBar.open('User login successful!', 'OK', {
          duration: 5000,
        });
      },
      (error) => {
        console.log(error);
        this.snackBar.open(error, 'OK', { duration: 5000 });
      }
    );
  }
}
