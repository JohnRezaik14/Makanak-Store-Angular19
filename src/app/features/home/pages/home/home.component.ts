import { Component, OnInit } from '@angular/core';
import { MainLayoutComponent } from '../../../../shared/layouts/main-layout/main-layout.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [MainLayoutComponent],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
