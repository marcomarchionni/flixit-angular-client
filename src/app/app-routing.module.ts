import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { loggedInGuard } from './guards/logged-in.guard';
import { SignupPageComponent } from './components/signup-page/signup-page.component';
import { loggedOutGuard } from './guards/logged-out.guard';
import { MoviesPageComponent } from './components/movies-page/movies-page.component';
import { FavouritesPageComponent } from './components/favourites-page/favourites-page.component';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [loggedOutGuard],
  },
  {
    path: 'signup',
    component: SignupPageComponent,
    canActivate: [loggedOutGuard],
  },
  {
    path: 'movies',
    component: MoviesPageComponent,
    canActivate: [loggedInGuard],
  },
  {
    path: 'favourites',
    component: FavouritesPageComponent,
    canActivate: [loggedInGuard],
  },
  { path: '', redirectTo: 'movies', pathMatch: 'prefix' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
