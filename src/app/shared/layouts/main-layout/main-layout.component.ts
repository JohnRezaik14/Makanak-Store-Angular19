import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css'],
  imports: [HeaderComponent, FooterComponent],
})
export class MainLayoutComponent implements OnInit {
  products: [] = [];
  constructor() {}

  ngOnInit() {
    fetch('https://fakestoreapi.in/api/products')
      .then((res) => res.json())
      .then((res) => (this.products = res.products));
  }
}
