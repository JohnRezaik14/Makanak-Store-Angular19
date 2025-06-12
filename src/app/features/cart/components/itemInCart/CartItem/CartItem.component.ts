import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { CartProductsService } from '../../../../../core/services/cart/cartProducts.service';
import { Product } from '../../../../../core/models/Product';

@Component({
  selector: 'app-CartItem',
  templateUrl: './CartItem.component.html',
  styleUrls: ['./CartItem.component.css'],
})
export class CartItemComponent implements OnInit {
  @Input() product!: Product;
  constructor(
    public cartService: CartProductsService,
    private cdr: ChangeDetectorRef
  ) {}
  incrementCount(id: number) {
    this.cartService.increment(id);
  }
  get itemCount(): number {
    return this.cartService.getItemCount(this.product.id!);
  }
  decrementCount(id: number) {
    this.cartService.decrement(id);
  }

  removeFromCart(id: number) {
    this.cartService.removeFromCart(id);
  }

  ngOnInit() {}
}
