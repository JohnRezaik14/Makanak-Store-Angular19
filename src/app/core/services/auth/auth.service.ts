import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { LoginCredentials } from '../../models/auth.model';

interface RegisterRequest {
  email: string;
  password: string;
  username?: string;
  gender?: string;
  image?: File | null;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = 'http://localhost:3000';
  private readonly TOKEN_KEY = 'auth_token';
  private isAuthenticated = signal<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {
    this.checkAuthStatus();
  }

  registerUser(formData: FormData): Observable<{ accessToken: string }> {
    // Convert FormData to JSON object for json-server-auth
    const registerData: RegisterRequest = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      username: formData.get('username') as string,
      gender: formData.get('gender') as string,
    };

    const imageFile = formData.get('image') as File;
    if (imageFile && imageFile instanceof File) {
    }

    // json-server-auth expects JSON
    return this.http
      .post<{ accessToken: string; user: {} }>(
        `${this.API_URL}/register`,
        registerData
      )
      .pipe(
        tap((response) => {
          this.setUser(response.user);
          this.setToken(response.accessToken);
          this.isAuthenticated.set(true);

          this.router.navigate(['/']);
        })
      );
  }

  loginUser(
    credentials: LoginCredentials
  ): Observable<{ accessToken: string }> {
    return this.http
      .post<{ accessToken: string; user: {} }>(
        `${this.API_URL}/sigin`,
        credentials
      )
      .pipe(
        tap((response) => {
          this.setUser(response.user);
          this.setToken(response.accessToken);
          this.isAuthenticated.set(true);
          this.router.navigate(['/']);
        })
      );
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem('userData');
    this.isAuthenticated.set(false);
    this.router.navigate(['/']);
  }

  isLoggedIn() {
    return this.isAuthenticated();
  }

  private setToken(accessToken: string) {
    localStorage.setItem(this.TOKEN_KEY, accessToken);
  }
  private setUser(user: {}) {
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private checkAuthStatus() {
    const token = localStorage.getItem(this.TOKEN_KEY);
    this.isAuthenticated.set(!!token);
  }
}
