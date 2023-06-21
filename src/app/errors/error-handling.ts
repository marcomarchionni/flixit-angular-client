import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export class ErrorHandling {
  handleError(error: HttpErrorResponse): any {
    let message: string;
    let status: string;
    console.log(error);
    if (error.error && error.error.status && error.error.message) {
      status = `${error.error.status}`;
      message = error.error.message;
    } else if (error.status && error.message) {
      status = `${error.status}`;
      message = error.message;
    } else {
      status = '---';
      message = 'Unknown error';
    }
    console.error(`Error Status: ${status},` + `Error message: ${message}`);
    return throwError(() => new Error(message));
  }
}
