import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
  scrollToTop() {
    console.log('going to top');

    window.scrollTo({ top: 0, behavior: 'auto' });
  }
}
