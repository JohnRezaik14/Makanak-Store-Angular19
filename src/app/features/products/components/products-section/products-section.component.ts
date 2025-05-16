import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
export type Product = {
  id: number | undefined;
  title: string | undefined;
  image: string | undefined;
  brand: string | undefined;
  category: string | undefined;
  color: string | undefined;
  discription: string | undefined;
  discount: string | undefined;
  model: string | undefined;
  price: number | undefined;
};
@Component({
  selector: 'app-products-section',
  templateUrl: './products-section.component.html',
  styleUrls: ['./products-section.component.css'],
  imports: [CommonModule, ButtonModule, ProductCardComponent],
})
export class ProductsSectionComponent implements OnInit {
  products: Product[] = [];
  constructor() {}
  async ngOnInit() {
    const result = await this.fetchData();
    this.products = result;
    // console.log(result);
  }
  fetchData = async () => {
    const response = await fetch('https://fakestoreapi.in/api/products');
    const data = await response.json();
    return data.products;
  };
}
