import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { HeaderComponent } from './header.component';
import { CartService } from 'src/app/services/cart.service';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CartItem } from 'src/app/models/cart.model';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let cartServiceStub = {
    getTotal: (items: CartItem[]) => {},
    clearCart: () => {},
    checkout: (items: CartItem[]) => {},
  };
  const cartItems = [
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
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatToolbarModule,
        MatIconModule,
        MatMenuModule,
        MatBadgeModule,
      ],
      declarations: [HeaderComponent],
      providers: [{ provide: CartService, useValue: cartServiceStub }],
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    component.cart = {
      items: cartItems,
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set quantity when input cart is set', () => {
    expect(component.itemsQuantity).toBe(2);
  });

  it('should call cart service methods', () => {
    const getTotalSpy = spyOn(cartServiceStub, 'getTotal');
    const clearCartSpy = spyOn(cartServiceStub, 'clearCart');
    const checkoutSpy = spyOn(cartServiceStub, 'checkout');
    const menuButton = fixture.debugElement.query(By.css('[mat-icon-button]'));

    menuButton.triggerEventHandler('click');

    fixture.detectChanges();

    expect(getTotalSpy).toHaveBeenCalledWith(cartItems);

    const overlayContainer = document.querySelector('.cdk-overlay-container');
    const checkoutButton = overlayContainer?.querySelector(
      '[data-testid="tid-checkout"]'
    ) as HTMLButtonElement;
    const clearCartButton = overlayContainer?.querySelector(
      '[data-testid="tid-clear-cart"]'
    ) as HTMLButtonElement;

    checkoutButton.click();
    expect(checkoutSpy).toHaveBeenCalledWith(cartItems);

    clearCartButton.click();
    expect(clearCartSpy).toHaveBeenCalledTimes(1);
  });
});
