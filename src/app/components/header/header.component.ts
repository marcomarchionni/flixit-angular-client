import { Component, OnInit } from '@angular/core';
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

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.userService.user$.pipe(map((user) => !!user));
    this.username$ = this.userService.user$.pipe(
      map((user) => (user ? user.username : ''))
    );
  }
}
