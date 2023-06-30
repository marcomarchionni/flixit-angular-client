import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { loggedInGuard } from './guards/logged-in.guard';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { loggedOutGuard } from './guards/logged-out.guard';
import { MoviesPageComponent } from './pages/movies-page/movies-page.component';
import { FavouritesPageComponent } from './pages/favourites-page/favourites-page.component';
import { MovieInfoPageComponent } from './pages/movie-info-page/movie-info-page.component';

/**
 * Defines the routes used in the application. The loggedInGuard and the loggedOutGuard
 * are employed to block or allow access to specific routes.
 *
 * @see loggedInGuard
 * @see loggedOutGuard
 */
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
    path: 'movies/:movieId',
    component: MovieInfoPageComponent,
    canActivate: [loggedInGuard],
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
