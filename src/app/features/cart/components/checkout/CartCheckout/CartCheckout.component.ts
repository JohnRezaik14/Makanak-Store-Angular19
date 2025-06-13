import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MessageService } from 'primeng/api';
import { OrdersService } from '../../../../../core/services/orders/orders.service';
import { CartProductsService } from '../../../../../core/services/cart/cartProducts.service';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-cart-checkout',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    RadioButtonModule,
    ToastModule,
  ],
  templateUrl: './CartCheckout.component.html',
  providers: [MessageService],
})
export class CartCheckoutComponent {
  checkoutForm!: FormGroup;
  loading = false;

  private fb = inject(FormBuilder);
  private ordersService = inject(OrdersService);
  private cartService = inject(CartProductsService);
  private messageService = inject(MessageService);
  private router = inject(Router);

  paymentMethods = [
    { label: 'Cash on Delivery', value: 'cod' },
    { label: 'Credit Card', value: 'card' },
  ];

  constructor() {
    this.initForm();
  }

  private initForm() {
    this.checkoutForm = this.fb.group({
      shippingAddress: ['', [Validators.required, Validators.minLength(10)]],
      paymentMethod: ['cod', Validators.required],
    });
  }

  get total() {
    return this.cartService.totalPrice();
  }

  onSubmit() {
    if (this.checkoutForm.valid) {
      this.loading = true;
      this.ordersService.createOrder(this.checkoutForm.value).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Order Placed',
            detail: 'Your order has been successfully placed!',
          });
          this.cartService.clearCart();
          this.router.navigate(['/profile'], {
            queryParams: { tab: 'orders' },
          });
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Order Failed',
            detail: 'Could not place your order. Please try again.',
          });
          console.error('Order creation failed:', error);
        },
        complete: () => {
          this.loading = false;
        },
      });
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Invalid Form',
        detail: 'Please fill all required fields correctly.',
      });
    }
  }
}
