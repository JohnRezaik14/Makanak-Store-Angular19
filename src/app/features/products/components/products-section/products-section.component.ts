import { Component, inject, OnInit } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Product } from '../../../../core/models/Product';
import { ProductsService } from '../../../../core/services/products/Products.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SearchService } from '../../../../core/services/search/search.service';

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
  private products: Product[] = [];
  loading = true;
  private searchService = inject(SearchService);

  constructor(private productsService: ProductsService) {}

  async ngOnInit() {
    try {
      this.products = await this.productsService.getProducts();
      this.searchService.setOriginalProducts(this.products);
      this.preloadImages();
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      this.loading = false;
    }
  }

  get filteredProducts(): Product[] {
    return this.searchService.getFilteredProducts();
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
