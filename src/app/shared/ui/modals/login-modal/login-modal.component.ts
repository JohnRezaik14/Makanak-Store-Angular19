import { Component, inject, OnInit } from '@angular/core';
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
import { FileUpload } from 'primeng/fileupload';
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
    FileUpload,
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
  genders = [{ name: 'Male' }, { name: 'Female' }];
  uploadedImage: File | null = null;

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
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      gender: ['', Validators.required],
      image: [null],
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
            summary: 'Success',
            detail: 'Logged in successfully',
          });
          this.closeDialog();
        },
        error: (error: Error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.message || 'Login failed',
          });
        },
      });
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Validation',
        detail: 'Please fill all required fields correctly',
      });
    }
  }

  onRegister(): void {
    if (this.registerForm.valid) {
      const formData = new FormData();
      const registerData: RegisterData = this.registerForm.value;

      Object.keys(registerData).forEach((key) => {
        if (key === 'image' && this.uploadedImage) {
          formData.append(key, this.uploadedImage);
        } else {
          const value = registerData[key as keyof RegisterData];
          if (value !== undefined) {
            formData.append(key, value as string);
          }
        }
      });

      this.authService.registerUser(formData).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Registered successfully',
          });
          this.closeDialog();
        },
        error: (error: Error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.message || 'Registration failed',
          });
        },
      });
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Validation',
        detail: 'Please fill all required fields correctly',
      });
    }
  }

  onUpload(event: UploadEvent) {
    if (event.files?.length > 0) {
      this.uploadedImage = event.files[0];
      this.registerForm.patchValue({ image: this.uploadedImage });
      this.messageService.add({
        severity: 'info',
        summary: 'Success',
        detail: 'Profile picture uploaded',
      });
    }
  }
}
