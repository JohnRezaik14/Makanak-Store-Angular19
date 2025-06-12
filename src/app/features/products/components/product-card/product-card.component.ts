import { Component, inject, Input, OnInit } from '@angular/core';
import { AddToCartComponent } from '../../../../shared/ui/buttons/add-to-cart/add-to-cart.component';
import { Product } from '../../../../core/models/Product';
import { CartProductsService } from '../../../../core/services/cart/cartProducts.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
  imports: [AddToCartComponent, RouterLink],
})
export class ProductCardComponent implements OnInit {
  constructor() {}
  @Input() product!: Product;
  addedToCart: boolean = false;
  private cartService = inject(CartProductsService);
  // totalCount = this.cartService.;
  ngOnInit() {}
  handleCart() {
    this.addedToCart = !this.addedToCart;
    console.log('added TO Cart In Product', this.addedToCart);
  }
}
