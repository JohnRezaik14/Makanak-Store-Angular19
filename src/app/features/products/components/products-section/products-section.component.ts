import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Product } from '../../../../core/models/Product';
import { ProductsService } from '../../../../core/services/products/Products.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-products-section',
  templateUrl: './products-section.component.html',
  styleUrls: ['./products-section.component.css'],
  imports: [
    CommonModule,
    ButtonModule,
    ProductCardComponent,
    ProgressSpinnerModule,
  ],
})
export class ProductsSectionComponent implements OnInit {
  products: Product[] = [];
  loading = true;

  constructor(private productsService: ProductsService) {}

  async ngOnInit() {
    try {
      this.products = await this.productsService.getProducts();
      this.preloadImages();
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      this.loading = false;
    }
  }

  private preloadImages(): void {
    this.products.forEach((product) => {
      if (product.image) {
        const img = new Image();
        img.src = product.image;
      }
    });
  }
}
