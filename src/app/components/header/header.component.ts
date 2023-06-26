import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
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
    this.isLoggedIn$ = this.userService.isLoggedIn();
    this.username$ = this.userService.getUsername();
  }

  logout() {
    this.userService.logout();
    this.router.navigateByUrl('login');
  }
}
