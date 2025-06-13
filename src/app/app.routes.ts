import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    title: 'Makanak',
    loadComponent: () =>
      import('./features/home/pages/home/home.component').then(
        (m) => m.HomeComponent
      ),
  },
  {
    path: 'about',
    title: 'About Us',
    loadComponent: () =>
      import('./features/about/pages/about/about.component').then(
        (m) => m.AboutComponent
      ),
  },
  {
    path: 'products',
    children: [
      {
        path: '',
        title: 'Products',
        loadComponent: () =>
          import(
            './features/products/components/products-section/products-section.component'
          ).then((m) => m.ProductsSectionComponent),
      },
      {
        path: ':id',
        title: 'Product Details',
        loadComponent: () =>
          import('./features/products/pages/product/Product.component').then(
            (m) => m.ProductComponent
          ),
      },
    ],
  },
  {
    path: 'cart',
    title: 'Shopping Cart',
    loadComponent: () =>
      import('./features/cart/pages/cart/cart/cart.component').then(
        (m) => m.CartComponent
      ),
  },
  {
    path: 'profile',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        title: 'User Profile',
        loadComponent: () =>
          import('./features/profile/profile.component').then(
            (m) => m.ProfileComponent
          ),
      },
      {
        path: 'orders',
        title: 'Orders History',
        loadComponent: () =>
          import('./features/profile/profile.component').then(
            (m) => m.ProfileComponent
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
