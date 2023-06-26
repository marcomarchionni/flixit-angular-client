export interface Director {
  name: string;
  born?: Date;
  died?: Date;
  bio?: string;
}

export interface Genre {
  name: string;
  description: string;
}

export interface Star {
  name: string;
  born?: Date;
  died?: Date;
  bio?: string;
}

export interface Movie {
  _id: string;
  title: string;
  originalTitle: string;
  year: string;
  description: string;
  director: Director;
  stars: Star[];
  genre: Genre;
  posterUrl: string;
  photoUrl: string;
}

export interface UserDetails {
  username: string;
  email: string;
  password: string;
  birthday?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface User extends UserDetails {
  favouriteMovies: string[];
}

export interface UserUpdate {
  username?: string;
  email?: string;
  password?: string;
  birthday?: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface ErrorResponse {
  status: number;
  message: string;
}

export interface AlertContent {
  message: string;
  variant: 'danger' | 'success' | 'warn';
  dismissible?: boolean;
}

export type FavouriteIcon = 'favorite' | 'favorite_border';
