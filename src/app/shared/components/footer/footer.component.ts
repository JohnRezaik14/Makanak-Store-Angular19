import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  imports: [RouterModule],
})
export class FooterComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
  scrollToTop() {
    console.log('going to top');

    window.scrollTo({ top: 0, behavior: 'auto' });
  }
}
