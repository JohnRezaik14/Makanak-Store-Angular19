import { Component, inject, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../../core/services/auth/auth.service';
import {
  LoginCredentials,
  RegisterData,
} from '../../../../core/models/auth.model';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { HttpEvent } from '@angular/common/http';

interface UploadEvent {
  originalEvent: HttpEvent<any>;
  files: File[];
}

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css'],
  imports: [
    Dialog,
    ButtonModule,
    InputTextModule,
    SelectModule,
    FormsModule,
    CommonModule,
    ToastModule,
    ReactiveFormsModule,
  ],
  providers: [MessageService],
})
export class LoginModalComponent implements OnInit {
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  isSignUpMode = false;
  visible = false;
  genders = ['Male', 'Female'];

  public authService = inject(AuthService);
  private fb = inject(FormBuilder);

  constructor(private messageService: MessageService) {
    this.initializeForms();
  }

  private initializeForms(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      gender: ['', Validators.required],
    });
  }

  ngOnInit() {}

  showDialog() {
    this.visible = true;
    this.isSignUpMode = false;
  }

  toggleMode() {
    this.isSignUpMode = !this.isSignUpMode;
  }

  closeDialog() {
    this.visible = false;
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const credentials: LoginCredentials = this.loginForm.value;
      this.authService.loginUser(credentials).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Welcome Back!',
            detail: 'You have successfully logged in',
            life: 3000,
          });
          this.closeDialog();
        },
        error: (error: any) => {
          let message = 'Login failed';

          if (error.status === 401) {
            message = 'Invalid email or password';
          } else if (error.status === 404) {
            message = 'Account not found or password is not correct';
          } else if (error.status === 400) {
            message = 'Please check your credentials';
          }

          this.messageService.add({
            severity: 'error',
            summary: 'Login Error',
            detail: message,
            life: 5000,
          });
        },
      });
    } else {
      const controls = this.loginForm.controls;
      let errorMessage = '';

      if (controls['email'].errors) {
        errorMessage = controls['email'].errors['required']
          ? 'Email is required'
          : 'Please enter a valid email';
      } else if (controls['password'].errors) {
        errorMessage = controls['password'].errors['required']
          ? 'Password is required'
          : 'Password must be at least 6 characters';
      }

      this.messageService.add({
        severity: 'warn',
        summary: 'Validation Error',
        detail: errorMessage || 'Please fill all required fields correctly',
        life: 4000,
      });
    }
  }

  onRegister(): void {
    if (this.registerForm.valid) {
      const formData = new FormData();
      const registerData: RegisterData = this.registerForm.value;

      Object.keys(registerData).forEach((key) => {
        const value = registerData[key as keyof RegisterData];
        if (value !== undefined) {
          formData.append(key, value as string);
        }
      });

      this.authService.registerUser(formData).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Welcome!',
            detail: 'Your account has been created successfully',
            life: 3000,
          });
          this.closeDialog();
        },
        error: (error: any) => {
          let message = 'Registration failed';

          if (error.status === 400) {
            message = 'Email already exists';
          } else {
            message = error.error?.message || 'Invalid registration data';
          }

          this.messageService.add({
            severity: 'error',
            summary: 'Registration Error',
            detail: message,
            sticky: true,
          });
        },
      });
    } else {
      const controls = this.registerForm.controls;
      let errorMessage = '';

      if (controls['email'].errors) {
        errorMessage = 'Please enter a valid email address';
      } else if (controls['username'].errors) {
        errorMessage = 'Username must be at least 3 characters';
      } else if (controls['password'].errors) {
        errorMessage = 'Password must be at least 6 characters';
      } else if (controls['gender'].errors) {
        errorMessage = 'Please select your gender';
      }

      this.messageService.add({
        severity: 'warn',
        summary: 'Validation Error',
        detail: errorMessage || 'Please fill all required fields correctly',
        life: 4000,
      });
    }
  }
}
