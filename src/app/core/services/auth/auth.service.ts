import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { LoginCredentials } from '../../models/auth.model';

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

  registerUser(formData: FormData): Observable<{ token: string }> {
    return this.http
      .post<{ token: string }>(`${this.API_URL}/signup`, formData)
      .pipe(
        tap((response) => {
          this.setToken(response.token);
          this.isAuthenticated.set(true);
          this.router.navigate(['/products']);
        })
      );
  }

  loginUser(credentials: LoginCredentials): Observable<{ token: string }> {
    return this.http
      .post<{ token: string }>(`${this.API_URL}/sigin`, credentials)
      .pipe(
        tap((response) => {
          this.setToken(response.token);
          this.isAuthenticated.set(true);
          this.router.navigate(['/products']);
        })
      );
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return this.isAuthenticated();
  }

  private setToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  private checkAuthStatus() {
    const token = localStorage.getItem(this.TOKEN_KEY);
    this.isAuthenticated.set(!!token);
  }
}
