import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GlobalHttpInterceptorService implements HttpInterceptor {
  constructor(private userService: UserService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
            console.log('Error Event');
          } else {
            const status = error.error.status || error.status;
            if (status === 401) {
              this.userService.logout();
              this.router.navigateByUrl('/login');
            }
          }
        }
        return throwError(() => error);
      })
    );
  }
}
