import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { User } from 'src/app/common/interfaces';
import { UserService } from 'src/app/services/user.service';

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
    this.isLoggedIn$ = this.userService.user$.pipe(
      map((user) => {
        return !!user;
      })
    );

    this.username$ = this.userService.user$.pipe(
      map((user) => (user ? user.username : ''))
    );
  }

  logout() {
    this.userService.logout();
    this.router.navigateByUrl('login');
  }
}
