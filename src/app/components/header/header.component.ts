import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

/**
 * HeaderComponent represents the site header.
 * It displays the logo and menu and the logged-in user.
 * It provides a method to logout the current user and navigate back to the login page.
 *
 * @property {Observable<string>} username$ - An Observable representing the current logged-in username.
 * @property {Observable<boolean>} isLoggedIn$ - An Observable indicating if a user is currently logged in.
 *
 * @see UserService
 * @see Router
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  username$!: Observable<string>;
  isLoggedIn$!: Observable<boolean>;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.userService.isLoggedIn();
    this.username$ = this.userService.getUsername();
  }

  logout() {
    this.userService.logout();
    this.router.navigateByUrl('login');
  }
}
