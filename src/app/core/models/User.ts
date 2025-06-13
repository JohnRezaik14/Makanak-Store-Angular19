export interface RegisterData {
  email: string;
  username: string;
  password: string;
  gender: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
  gender: string;
}
