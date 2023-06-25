import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { MovieGridComponent } from './components/movie-grid/movie-grid.component';
import { authGuard } from './guards/auth.guard';

const appRoutes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'movies', component: MovieGridComponent, canActivate: [authGuard] },
  { path: '', redirectTo: 'movies', pathMatch: 'prefix' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
