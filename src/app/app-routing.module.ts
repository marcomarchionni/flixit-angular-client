import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { MovieGridComponent } from './components/movie-grid/movie-grid.component';
import { loggedInGuard } from './guards/logged-in.guard';
import { SignupPageComponent } from './components/signup-page/signup-page.component';
import { loggedOutGuard } from './guards/logged-out.guard';

const appRoutes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
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
    component: MovieGridComponent,
    canActivate: [loggedInGuard],
  },
  { path: '', redirectTo: 'movies', pathMatch: 'prefix' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
