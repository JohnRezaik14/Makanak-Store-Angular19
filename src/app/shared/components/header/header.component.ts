import { Component, inject, OnInit } from '@angular/core';
// import { UserMenuComponent } from '../user-menu/user-menu.component';
import { LoginModalComponent } from '../../ui/modals/login-modal/login-modal.component';
import { RouterLink } from '@angular/router';
import { CartProductsService } from '../../../core/services/cart/cartProducts.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [LoginModalComponent, RouterLink],
})
export class HeaderComponent {
  private cartService = inject(CartProductsService);
  totalCount = this.cartService.totalCount;
}
