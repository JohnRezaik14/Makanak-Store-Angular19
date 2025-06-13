import { Component, computed, inject } from '@angular/core';
import { MegaMenuItem } from 'primeng/api';
import { MegaMenu } from 'primeng/megamenu';
import { AuthService } from '../../../core/services/auth/auth.service';
import { UserService } from '../../../core/services/user/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css'],
  standalone: true,
  imports: [MegaMenu, CommonModule],
})
export class UserMenuComponent {
  public userService = inject(UserService);
  private authService = inject(AuthService);

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
                {
                  label: 'Last Order',
                  command: () => this.navigateToOrders('last'),
                },
                {
                  label: 'All Orders',
                  command: () => this.navigateToOrders('all'),
                },
                {
                  label: 'Upcoming Orders',
                  command: () => this.navigateToOrders('upcoming'),
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

  private navigateToOrders(type: string) {
    // Implement navigation logic
  }

  private navigateToProfile() {
    // Implement navigation logic
  }

  private logout() {
    this.authService.logout();
    // this.userService.clearUserData();
  }
}
