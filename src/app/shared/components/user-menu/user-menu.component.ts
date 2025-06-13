import { Component, computed, inject } from '@angular/core';
import { MegaMenuItem } from 'primeng/api';
import { MegaMenu } from 'primeng/megamenu';
import { AuthService } from '../../../core/services/auth/auth.service';
import { UserService } from '../../../core/services/user/user.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css'],
  standalone: true,
  imports: [MegaMenu, CommonModule, RouterModule],
})
export class UserMenuComponent {
  public userService = inject(UserService);
  private authService = inject(AuthService);
  private router = inject(Router);
  constructor() {
    // console.log(this.userService.userData);
  }
  items = computed(() => {
    const user = this.userService.userData;

    if (!user) return [];

    return [
      {
        label: user.username,
        icon: 'pi pi-user',
        items: [
          [
            {
              label: 'Your Orders',
              items: [
                // {
                //   label: 'Last Order',
                //   command: () => this.navigateToOrders('last'),
                // },
                {
                  label: 'All Orders',
                  command: () => this.navigateToOrders('all'),
                },
                {
                  label: 'Pending Orders',
                  icon: 'pi pi-hourglass',
                  command: () => this.navigateToOrders('pending'),
                },
              ],
            },
          ],
          [
            {
              label: 'Account',
              items: [
                {
                  label: 'Profile',
                  icon: 'pi pi-user-edit',
                  command: () => this.navigateToProfile(),
                },
                {
                  label: 'Logout',
                  icon: 'pi pi-sign-out',
                  command: () => this.logout(),
                },
              ],
            },
          ],
        ],
      },
    ] as MegaMenuItem[];
  });

  navigateToOrders(type: string = 'all') {
    this.router.navigate(['/profile'], {
      queryParams: {
        tab: 'orders',
        filter: type,
      },
    });
  }

  navigateToCart() {
    this.router.navigate(['/cart']);
  }
  navigateToProfile() {
    this.router.navigate(['/profile'], {
      queryParams: { tab: 'info' },
    });
  }

  private logout() {
    this.authService.logout();
    this.userService.setUserData(null);
  }
}
