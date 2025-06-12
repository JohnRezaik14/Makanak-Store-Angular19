/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CartProductsService } from './cartProducts.service';

describe('Service: CartProducts', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CartProductsService]
    });
  });

  it('should ...', inject([CartProductsService], (service: CartProductsService) => {
    expect(service).toBeTruthy();
  }));
});
