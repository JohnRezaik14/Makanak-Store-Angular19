import { Injectable, WritableSignal, signal, computed } from '@angular/core';
import { Product } from '../../models/Product';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartProductsService {
  private productsInCart: WritableSignal<Product[]> = signal([]);
  private readonly CART_KEY = 'shopping_cart';
  readonly items = this.productsInCart.asReadonly();

  constructor(private http: HttpClient) {
    this.loadFromStorage();
  }

  // Total item count
  readonly totalCount = computed(() =>
    this.productsInCart().reduce((sum, item) => sum + item.count, 0)
  );

  // Total price
  readonly totalPrice = computed(() =>
    this.productsInCart().reduce(
      (sum, item) => sum + item.price * item.count,
      0
    )
  );

  getItemsInCart() {
    return this.productsInCart();
  }

  checkIfInCart(productId: number): boolean {
    return this.productsInCart().some((item) => item.id === productId);
  }

  getItemCount(productId: number): number {
    return this.getItem(productId)?.count ?? 0;
  }

  addToCart(product: Product) {
    const existing = this.getItem(product.id);
    if (existing) {
      this.updateItem(product.id, existing.count + 1);
    } else {
      this.productsInCart.update((items) => [
        ...items,
        { ...product, count: 1, isInCart: true },
      ]);
    }
    this.saveToStorage();
  }

  removeFromCart(productId: number) {
    this.productsInCart.update((items) =>
      items.filter((item) => item.id !== productId)
    );
    this.saveToStorage();
  }

  increment(productId: number) {
    this.updateItem(productId, (this.getItem(productId)?.count ?? 0) + 1);
  }

  decrement(productId: number) {
    const current = this.getItem(productId);
    if (current && current.count > 1) {
      this.updateItem(productId, current.count - 1);
    } else {
      this.removeFromCart(productId);
    }
  }

  private updateItem(id: number, count: number) {
    this.productsInCart.update((items) =>
      items.map((item) => (item.id === id ? { ...item, count: count } : item))
    );
    this.saveToStorage();
  }

  private getItem(id: number): Product | undefined {
    return this.productsInCart().find((item) => item.id === id);
  }
  // private isInCart(id: number): Product | undefined {
  //   return this.productsInCart().find((item) => item.id === id);
  // }

  private loadFromStorage(): void {
    const data = localStorage.getItem(this.CART_KEY);
    if (data) {
      this.productsInCart.set(JSON.parse(data));
    }
  }

  // syncCartWithAPI(): Observable<any> {
  //   return this.http.post('/api/cart/sync', this.productsInCart());
  // }

  clearCart() {
    this.productsInCart.set([]);
  }

  private saveToStorage(): void {
    localStorage.setItem(this.CART_KEY, JSON.stringify(this.productsInCart()));
  }
}
