import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/services/user/user.service';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { MessageService } from 'primeng/api';

import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from '../../core/services/orders/orders.service';
import { CartProductsService } from '../../core/services/cart/cartProducts.service';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule as FormsM } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { Order } from '../../core/models/orders';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    TabViewModule,
    CardModule,
    ButtonModule,
    TableModule,
    TagModule,
    FormsM,
    ReactiveFormsModule,
    InputTextModule,
    SelectButtonModule,
    RadioButtonModule,
    InputTextModule,
    ToastModule,
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [MessageService],
})
export class ProfileComponent implements OnInit {
  private userService = inject(UserService);
  activeTab = 0;

  orders: Order[] = [];

  orderStatusOptions = [
    { label: 'All', value: null },
    { label: 'Pending', value: 'pending' },
    { label: 'Accepted', value: 'accepted' },
    { label: 'Rejected', value: 'rejected' },
  ];

  selectedStatus: string | null = null;

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
  constructor(private route: ActivatedRoute) {}
  get user() {
    return this.userService.userData;
  }

  get filteredOrders() {
    if (!this.selectedStatus) return this.orders;
    return this.orders.filter((order) => order.status === this.selectedStatus);
  }

  ngOnInit() {
    if (!this.user) {
      this.router.navigate(['/']);
    }
    this.initForm();
    // Handle tab selection from query params
    this.route.queryParams.subscribe((params) => {
      if (params['tab']) {
        this.activeTab = params['tab'] === 'orders' ? 1 : 0;
      }

      if (params['filter']) {
        this.selectedStatus =
          params['filter'] === 'all' ? null : params['filter'];
      }
    });

    // Load orders
    this.loadOrders();
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

  getStatusSeverity(status: string): string {
    const severityMap: { [key: string]: string } = {
      pending: 'warning',
      accepted: 'success',
      rejected: 'danger',
    };
    return severityMap[status] || 'info';
  }
  private loadOrders() {
    this.ordersService.getUserOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
      },
      error: (error) => {
        console.error('Failed to load orders:', error);
      },
    });
  }
  cancelOrder(orderId: number) {
    this.ordersService.cancelOrder(orderId).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Order Cancelled',
          detail: 'Your order has been successfully cancelled',
        });

        this.loadOrders();
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Cancellation Failed',
          detail: 'Could not cancel the order. Please try again.',
        });
        console.error('Order cancellation failed:', error);
      },
    });
  }

  isCancellable(status: string): boolean {
    return status === 'pending';
  }
}
