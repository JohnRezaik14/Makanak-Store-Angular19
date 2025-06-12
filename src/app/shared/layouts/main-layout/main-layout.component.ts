import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
// import { HeaderComponent } from '../../components/header/header.component';
// import { FooterComponent } from '../../components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ProductCardComponent } from '../../../features/products/components/product-card/product-card.component';
import { ProductsSectionComponent } from '../../../features/products/components/products-section/products-section.component';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css'],
  imports: [CommonModule, ButtonModule, ProductsSectionComponent],
})
export class MainLayoutComponent implements OnInit, OnChanges {
  constructor() {}

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.products);
  }
}
