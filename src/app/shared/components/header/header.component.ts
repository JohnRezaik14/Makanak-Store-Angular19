import { Component, OnInit } from '@angular/core';
// import { UserMenuComponent } from '../user-menu/user-menu.component';
import { LoginModalComponent } from '../../ui/modals/login-modal/login-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [LoginModalComponent],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
