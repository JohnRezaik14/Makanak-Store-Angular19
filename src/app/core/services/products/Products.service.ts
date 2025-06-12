import { Injectable } from '@angular/core';
import { Product } from '../../models/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly CACHE_KEY = 'products_cache';
  private readonly CACHE_EXPIRY = 1000 * 60 * 60; // 1 hour
  private readonly API_URL = 'https://fakestoreapi.in/api';

  async getProducts(): Promise<Product[]> {
    const cached = this.getFromCache();
    if (cached) {
      return cached;
    }

    const products = await this.fetchProducts();
    this.saveToCache(products);
    return products;
  }

  private async fetchProducts(): Promise<Product[]> {
    const response = await fetch(`${this.API_URL}/products`);
    const data = await response.json();
    return data.products;
  }

  private getFromCache(): Product[] | null {
    const cached = localStorage.getItem(this.CACHE_KEY);
    if (!cached) return null;

    const { timestamp, data } = JSON.parse(cached);
    if (Date.now() - timestamp > this.CACHE_EXPIRY) {
      localStorage.removeItem(this.CACHE_KEY);
      return null;
    }

    return data;
  }

  private saveToCache(products: Product[]): void {
    const cache = {
      timestamp: Date.now(),
      data: products,
    };
    localStorage.setItem(this.CACHE_KEY, JSON.stringify(cache));
  }

  async getProductById(id: number): Promise<Product> {
    const response = await fetch(`${this.API_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error('Product not found');
    }
    return response.json();
  }
}
