export interface User {
  email: string;
  username: string;
  password: string;
  image?: string;
  gender: 'male' | 'female';
}