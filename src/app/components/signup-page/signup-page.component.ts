import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../../services/fetch-api-data.service';
import { UserDetails } from '../../common/interfaces';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
})
export class SignupPageComponent {
  @Input() userData: UserDetails = {
    username: '',
    password: '',
    email: '',
    birthday: '',
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<SignupPageComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  registerUser(): void {
    this.fetchApiData.signupUser(this.userData).subscribe(
      (response) => {
        console.log(response);
        // TODO: logic for user registration
        // Close the modal on success
        this.dialogRef.close();
        this.snackBar.open('User registration successful!', 'OK', {
          duration: 2000,
        });
      },
      (error) => {
        console.log(error);
        this.snackBar.open(error, 'OK', { duration: 5000 });
      }
    );
  }
}
