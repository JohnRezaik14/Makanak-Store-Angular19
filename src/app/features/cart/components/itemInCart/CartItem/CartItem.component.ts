import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { CartProductsService } from '../../../../../core/services/cart/cartProducts.service';
import { Product } from '../../../../../core/models/Product';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
@Component({
  selector: 'app-CartItem',
  templateUrl: './CartItem.component.html',
  styleUrls: ['./CartItem.component.css'],
  imports: [
    CommonModule,
    ButtonModule,
    ImageModule,
    ProgressSpinnerModule,
    RouterLink,
  ],
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
