import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CartProductsService } from '../cart/cartProducts.service';
import { Order } from '../../models/orders';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private readonly API_URL = 'http://localhost:3000';
  private cartService = inject(CartProductsService);
  private userService = inject(UserService);
  user = this.userService.userData;
  constructor(private http: HttpClient) {}

  createOrder(orderData: {
    shippingAddress: string;
    paymentMethod: string;
  }): Observable<Order> {
    const cartItems = this.cartService.getItemsInCart();
    const totalCount = this.cartService.totalPrice();
    const user = this.userService.userData;
    const order = {
      userId: user?.id,
      items: cartItems.map((item) => ({
        productId: item.id,
        quantity: item.count,
        price: item.price,
      })),
      totalCount,
      status: 'pending',
      date: new Date().toISOString(),
      shippingAddress: orderData.shippingAddress,
      paymentMethod: orderData.paymentMethod,
    };

    return this.http.post<Order>(`${this.API_URL}/orders`, order);
  }

  getUserOrders(): Observable<Order[]> {
    const user = this.userService.userData;
    return this.http.get<Order[]>(
      `${this.API_URL}/orders?userId=${user?.id}&_sort=date&_order=desc`
    );
  }

  cancelOrder(orderId: number): Observable<Order> {
    return this.http.patch<Order>(`${this.API_URL}/orders/${orderId}`, {
      status: 'cancelled',
    });
  }
}
