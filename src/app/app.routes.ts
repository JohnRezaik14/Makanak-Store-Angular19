import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/pages/home/home.component';
import { AboutComponent } from './features/about/pages/about/about.component';
import { CartComponent } from './features/cart/pages/cart/cart/cart.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'products',
    loadComponent: () =>
      import(
        './features/products/components/products-section/products-section.component'
      ).then((m) => m.ProductsSectionComponent),
    canActivate: [authGuard],
  },
  {
    path: 'products/:id',
    loadComponent: () =>
      import('./features/products/pages/product/Product.component').then(
        (m) => m.ProductComponent
      ),
  },
];
