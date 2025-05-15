import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { AddToCartComponent } from '../../ui/buttons/add-to-cart/add-to-cart.component';
export type Product = {
  id: number;
  title: string;
  image: string;
  brand: string;
  category: string;
  color: string;
  discription: string;
  discount: string;
  model: string;
  price: number;
};
@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css'],
  imports: [
    HeaderComponent,
    FooterComponent,
    CommonModule,
    ButtonModule,
    AddToCartComponent,
  ],
})
export class MainLayoutComponent implements OnInit, OnChanges {
  products: Product[] = [];
  constructor() {}
  fetchData = async () => {
    const response = await fetch('https://fakestoreapi.in/api/products');
    const data = await response.json();
    return data.products;
  };
  async ngOnInit() {
    const result = await this.fetchData();
    this.products = result;
    console.log(result);
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.products);
  }
}
