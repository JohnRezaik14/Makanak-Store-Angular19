import {
  Injectable,
  WritableSignal,
  signal,
  computed,
  Inject,
} from '@angular/core';
import { Product } from '../../models/Product';
import { catchError, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { UserService } from '../user/user.service';
import { CartProduct } from '../../models/CartProduct';

@Injectable({
  providedIn: 'root',
})
export class CartProductsService {
  private productsInCart: WritableSignal<Product[]> = signal([]);
  private readonly CART_KEY = 'shopping_cart';
  private readonly API_URL = 'http://localhost:3000';
  readonly items = this.productsInCart.asReadonly();
  private userService = Inject(UserService);
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

  private loadFromStorage(): void {
    const user = this.userService.userData;
    if (user) {
      // Try to load from API first
      this.http
        .get<{ items: Product[] }>(`${this.API_URL}/carts/${user.id}`)
        .subscribe({
          next: (response) => {
            this.productsInCart.set(response.items);
            this.saveToStorage(); // Backup to localStorage
          },
          error: () => {
            // Fallback to localStorage if API fails
            const savedCart = localStorage.getItem(this.CART_KEY);
            if (savedCart) {
              this.productsInCart.set(JSON.parse(savedCart));
              this.syncCartWithAPI(); // Try to sync with API
            }
          },
        });
    } else {
      // No user, use localStorage only
      const savedCart = localStorage.getItem(this.CART_KEY);
      if (savedCart) {
        this.productsInCart.set(JSON.parse(savedCart));
      }
    }
  }

  private syncCartWithAPI() {
    const user = this.userService.userData;
    if (!user) return;

    const cartData = {
      userId: user.id,
      items: this.productsInCart(),
    };

    this.http
      .put(`${this.API_URL}/carts/${user.id}`, cartData)
      .pipe(
        catchError((error) => {
          if (error.status === 404) {
            return this.http.post(`${this.API_URL}/carts`, cartData);
          }
          return of(error);
        })
      )
      .subscribe({
        next: () => console.log('Cart synced with API'),
        error: (error) => console.error('Failed to sync cart:', error),
      });
  }

  clearCart() {
    this.productsInCart.set([]);
    this.saveToStorage();
  }

  private saveToStorage(): void {
    localStorage.setItem(this.CART_KEY, JSON.stringify(this.productsInCart()));
    this.syncCartWithAPI();
  }
}
