import { Injectable, signal } from '@angular/core';
import { Product } from '../../models/Product';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private originalProducts = signal<Product[]>([]);
  private filteredProducts = signal<Product[]>([]);
  private searchQuery = signal<string>('');

  setOriginalProducts(products: Product[]) {
    this.originalProducts.set(products);
    this.filteredProducts.set(products);
  }

  setSearchQuery(query: string) {
    this.searchQuery.set(query);
    this.applyFilter();
  }

  getFilteredProducts(): Product[] {
    return this.filteredProducts();
  }

  clearSearch() {
    this.searchQuery.set('');
    this.filteredProducts.set(this.originalProducts());
  }

  private applyFilter() {
    const query = this.searchQuery().toLowerCase().trim();

    if (!query) {
      this.filteredProducts.set(this.originalProducts());
      return;
    }

    const filtered = this.originalProducts().filter(
      (product) =>
        product.title?.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query)
    );

    this.filteredProducts.set(filtered);
  }
}
