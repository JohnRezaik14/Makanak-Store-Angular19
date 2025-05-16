import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './features/home/pages/home/home.component';
import { AboutComponent } from './features/about/pages/about/about.component';

@Component({
  selector: 'app-root',
  imports: [HttpClientModule, RouterOutlet, HomeComponent, AboutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'makanak';
}
