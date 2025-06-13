import { Component, inject, OnInit } from '@angular/core';
import { UserMenuComponent } from '../user-menu/user-menu.component';
import { LoginModalComponent } from '../../ui/modals/login-modal/login-modal.component';
import { RouterLink } from '@angular/router';
import { CartProductsService } from '../../../core/services/cart/cartProducts.service';
import { AuthService } from '../../../core/services/auth/auth.service';

import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { InputTextModule } from 'primeng/inputtext';
import { SearchService } from '../../../core/services/search/search.service';
// import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [
    LoginModalComponent,
    RouterLink,
    UserMenuComponent,
    InputTextModule,
    FormsModule,
    CommonModule,
  ],
})
export class HeaderComponent {
  private cartService = inject(CartProductsService);
  private authService = inject(AuthService);
  private searchService = inject(SearchService);
  private router = inject(Router);
  isAuthenticated = this.authService.isLoggedIn();
  totalCount = this.cartService.totalCount;
  searchQuery = '';

  constructor() {
    // Clear search when navigating away from products
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        if (!event.url.includes('/products')) {
          this.searchService.clearSearch();
          this.searchQuery = '';
        }
      });
  }

  onSearch(event: Event) {
    const query = (event.target as HTMLInputElement).value;
    this.searchService.setSearchQuery(query);
  }

  clearSearch() {
    this.searchQuery = '';
    this.searchService.clearSearch();
  }
}
