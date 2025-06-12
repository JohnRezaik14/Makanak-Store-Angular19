import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ProductsService } from '../../../../core/services/products/Products.service';
import { CartProductsService } from '../../../../core/services/cart/cartProducts.service';
import { Product } from '../../../../core/models/Product';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, ButtonModule, ImageModule, ProgressSpinnerModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  product: Product | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    public cartService: CartProductsService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProduct(Number(id));
    }
  }

  private async loadProduct(id: number) {
    try {
      this.loading = true;
      this.product = await this.productsService.getProductById(id);
    } catch (error) {
      this.error = 'Failed to load product';
      console.error(error);
    } finally {
      this.loading = false;
    }
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  isInCart(productId: number): boolean {
    return this.cartService.checkIfInCart(productId);
  }

  getItemCount(productId: number): number {
    return this.cartService.getItemCount(productId);
  }

  increment(productId: number) {
    this.cartService.increment(productId);
  }

  decrement(productId: number) {
    this.cartService.decrement(productId);
  }
}
