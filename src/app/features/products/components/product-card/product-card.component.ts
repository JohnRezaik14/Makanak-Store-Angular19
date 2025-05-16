import { Component, Input, OnInit } from '@angular/core';
import { AddToCartComponent } from '../../../../shared/ui/buttons/add-to-cart/add-to-cart.component';
import { Product } from '../products-section/products-section.component';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
  imports: [AddToCartComponent],
})
export class ProductCardComponent implements OnInit {
  constructor() {}
  @Input() product: Product = {
    id: undefined,
    title: undefined,
    image: undefined,
    brand: undefined,
    category: undefined,
    color: undefined,
    discription: undefined,
    discount: undefined,
    model: undefined,
    price: undefined,
  };
  ngOnInit() {}
}
