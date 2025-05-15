import { Component, OnInit } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { HttpEvent } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
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
    HttpClientModule,
  ],
  providers: [MessageService],
})
export class LoginModalComponent implements OnInit {
  constructor(private messageService: MessageService) {}
  isSignUpMode = false;
  ngOnInit() {}
  visible: boolean = false;
  genders = [{ name: 'Male' }, { name: 'Female' }];
  selectedGender: string | undefined = undefined;
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
  onUpload(event: UploadEvent) {
    this.messageService.add({
      severity: 'info',
      summary: 'Success',
      detail: 'File Uploaded with Basic Mode',
    });
  }
}
