import { Component, computed, OnInit } from '@angular/core';
import { CartProductsService } from '../../../../../core/services/cart/cartProducts.service';
import { RouterLink } from '@angular/router';
import { CartItemComponent } from '../../../components/itemInCart/CartItem/CartItem.component';
import { Product } from '../../../../../core/models/Product';
import { CartCheckoutComponent } from '../../../components/checkout/CartCheckout/CartCheckout.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  imports: [CartItemComponent, RouterLink, CartCheckoutComponent],
})
export class CartComponent {
  // cartItems: Product[] = [];
  readonly cartItems = computed(() => this.cartService.getItemsInCart());
  readonly itemsCount = computed(() => this.cartService.totalCount());
  constructor(public cartService: CartProductsService) {}
}
