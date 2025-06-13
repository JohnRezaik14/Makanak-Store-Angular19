import { Injectable, signal } from '@angular/core';

export interface User {
  id: string;
  email: string;
  username: string;
  gender?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userDataSignal = signal<User | null>(null);

  constructor() {
    this.loadUserData();
  }

  get userData(): User | null {
    return this.userDataSignal();
  }

  setUserData(user: User | null) {
    this.userDataSignal.set(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private loadUserData() {
    const savedUser = localStorage.getItem('userData');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      this.userDataSignal.set(userData);
    }
  }
}
