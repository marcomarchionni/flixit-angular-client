import { Component, Input } from '@angular/core';
import { LoginResponse, LoginCredentials } from '../../common/interfaces';
import { FetchApiDataService } from '../../services/fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent {
  @Input() userData: LoginCredentials = {
    username: '',
    password: '',
  };

  constructor(
    private userService: UserService,
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {}

  loginUser() {
    this.userService.login(this.userData).subscribe({
      next: (response: LoginResponse) => {
        console.log(response);

        // close dialog
        this.dialogRef.close();
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
