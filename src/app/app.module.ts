import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { SignupPageComponent } from './components/signup-page/signup-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { MovieGridComponent } from './components/movie-grid/movie-grid.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from './components/header/header.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MoviesPageComponent } from './components/movies-page/movies-page.component';
import { FavouritesPageComponent } from './components/favourites-page/favourites-page.component';
import { MovieService } from './services/movie.service';
import { UserService } from './services/user.service';
import { StateService } from './services/state.service';
import { ApiService } from './services/api.service';
import { MovieInfoPageComponent } from './components/movie-info-page/movie-info-page.component';
import { InfoDialogComponent } from './components/info-dialog/info-dialog.component';
import { UsernameFieldComponent } from './components/forms/username-field/username-field.component';
import { PasswordFieldComponent } from './components/forms/password-field/password-field.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupPageComponent,
    LoginPageComponent,
    MovieGridComponent,
    HeaderComponent,
    MovieCardComponent,
    MoviesPageComponent,
    FavouritesPageComponent,
    MovieInfoPageComponent,
    InfoDialogComponent,
    UsernameFieldComponent,
    PasswordFieldComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
  ],
  providers: [MovieService, UserService, StateService, ApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
