import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartProductsService } from '../../../../core/services/cart/cartProducts.service';
import { Product } from '../../../../core/models/Product';
// import { Product } from '../../../../features/products/components/products-section/products-section.component';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class AddToCartComponent implements OnInit {
  @Input() product!: Product;

  constructor(public cartService: CartProductsService) {}

  ngOnInit() {}

  addToCart() {
    if (this.product.id) {
      this.cartService.addToCart({
        ...this.product,
        count: 1,
      });
    }
  }

  incrementCount() {
    if (this.product.id) {
      this.cartService.increment(this.product.id);
    }
  }

  decrementCount() {
    if (this.product.id) {
      this.cartService.decrement(this.product.id);
    }
  }

  removeFromCart() {
    if (this.product.id) {
      this.cartService.removeFromCart(this.product.id);
    }
  }
}
