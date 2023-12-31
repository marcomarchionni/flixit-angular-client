import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

/**
 * The ErrorHandling service handles HTTP errors across the application.
 * This service offers a single method, handleError(), which accepts an error object of
 * type HttpErrorResponse.
 *
 * The handleError() method then extracts the error status and message, it logs the error
 * details to the console and throws a new Error with the message.
 *
 * @see HttpErrorResponse
 */
@Injectable({
  providedIn: 'root',
})
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
