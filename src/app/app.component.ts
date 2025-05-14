import { Component } from '@angular/core';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
// import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [MainLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'makanak';
}
