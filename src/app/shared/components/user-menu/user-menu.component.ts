import { Component, OnInit } from '@angular/core';
import { MegaMenuItem } from 'primeng/api';
import { MegaMenu } from 'primeng/megamenu';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css'],
  imports: [MegaMenu],
})
export class UserMenuComponent implements OnInit {
  items: MegaMenuItem[] | undefined;
  constructor() {}

  ngOnInit() {
    this.items = [
      {
        label: 'Account',
        icon: 'pi pi-user',
        items: [
          [
            {
              label: 'Your Orders',
              items: [
                { label: 'last order' },
                { label: 'list all orders' },
                { label: 'upcoming orders' },
              ],
            },
          ],
          [
            {
              label: 'Your Lists',
              items: [
                { label: 'last order' },
                { label: 'list all orders' },
                { label: 'upcoming orders' },
              ],
            },
          ],
        ],
      },
    ];
  }
}
