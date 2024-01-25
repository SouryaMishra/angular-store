import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponent } from './cart.component';
import { CartService } from 'src/app/services/cart.service';
import { BehaviorSubject } from 'rxjs';
import { Cart } from 'src/app/models/cart.model';
import { MatCardModule } from '@angular/material/card';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartService = {
    cart: new BehaviorSubject<Cart>({ items: [] }),
    getTotal() {},
    clearCart() {},
    removeFromCart() {},
    addToCart() {},
    removeQuantity() {},
    checkout() {},
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatCardModule],
      declarations: [CartComponent],
      providers: [{ provide: CartService, useValue: cartService }],
    });
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
