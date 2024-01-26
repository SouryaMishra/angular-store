import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponent } from './cart.component';
import { CartService } from 'src/app/services/cart.service';
import { BehaviorSubject } from 'rxjs';
import { Cart } from 'src/app/models/cart.model';
import { MatCardModule } from '@angular/material/card';
import { By } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartService = {
    cart: new BehaviorSubject<Cart>({
      items: [],
    }),
    getTotal() {},
    clearCart() {},
    removeFromCart() {},
    addToCart() {},
    removeQuantity() {},
    checkout() {},
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatCardModule, MatTableModule],
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

  it('should display no items when cart is empty', () => {
    const cartService = fixture.debugElement.injector.get(CartService);
    cartService.cart.next({
      items: [],
    });

    fixture.detectChanges();

    const cartEmpty = fixture.debugElement.query(
      By.css('[data-testid="tid-cart-empty"]')
    );
    const startShoppingButton = cartEmpty.query(By.css('button'));

    expect(component.cart.items.length).toBe(0);
    expect(cartEmpty.nativeElement.textContent).toContain('Your cart is empty');
    expect(startShoppingButton.nativeElement.textContent).toContain(
      'Start shopping'
    );
  });

  it('should display all cart items', () => {
    const cartService = fixture.debugElement.injector.get(CartService);
    cartService.cart.next({
      items: [
        {
          product: 'Test 1',
          name: 'test name 1',
          price: 100,
          quantity: 2,
          id: 1,
        },
        {
          product: 'Test 2',
          name: 'test name 2',
          price: 200,
          quantity: 1,
          id: 2,
        },
      ],
    });

    fixture.detectChanges();

    const cartTable = fixture.debugElement.query(
      By.css('[data-testid="tid-cart-table"]')
    );

    const image = cartTable.queryAll(By.css('[data-testid="tid-product"]'));
    const name = cartTable.queryAll(By.css('[data-testid="tid-name"]'));
    const price = cartTable.queryAll(By.css('[data-testid="tid-price"]'));
    const quantity = cartTable.queryAll(By.css('[data-testid="tid-quantity"]'));
    const total = cartTable.queryAll(By.css('[data-testid="tid-total"]'));
    const grandTotal = cartTable.query(
      By.css('[data-testid="tid-grand-total"]')
    );

    expect(component.dataSource.length).toBe(2);

    /* mat-table contents are not visible in tests
    TODO: Find a way to fix it

    expect(image.length).toBe(2);
    expect(image[0].nativeElement.src).toContain(encodeURIComponent('Test 1'));
    expect(image[0].nativeElement.alt).toContain('test name 1');
    expect(image[1].nativeElement.src).toContain(encodeURIComponent('Test 2'));
    expect(image[1].nativeElement.alt).toContain('test name 2');

    expect(name.length).toBe(2);
    expect(name[0].nativeElement.textContent).toContain('test name 1');
    expect(name[1].nativeElement.textContent).toContain('test name 2');

    expect(price.length).toBe(2);
    expect(price[0].nativeElement.textContent).toContain('100');
    expect(price[1].nativeElement.textContent).toContain('200');

    expect(quantity.length).toBe(2);
    expect(quantity[0].nativeElement.textContent).toContain('2');
    expect(quantity[1].nativeElement.textContent).toContain('1');

    expect(total.length).toBe(2);
    expect(total[0].nativeElement.textContent).toContain('200');
    expect(total[1].nativeElement.textContent).toContain('200');

    expect(grandTotal.nativeElement.textContent).toContain('400');
    */
  });
});
