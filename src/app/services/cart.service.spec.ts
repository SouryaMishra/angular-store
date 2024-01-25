import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';
import { Cart, CartItem } from '../models/cart.model';
import { EnvironmentService } from './environment.service';
import { StripeService } from './stripe.service';
import { setupSpies } from './spies';

describe('CartService', () => {
  let service: CartService;
  let snackBar: any;
  let httpClient: any;
  let environment: any;
  let stripe: any;

  beforeEach(() => {
    const { snackBarSpy, httpClientSpy, environmentSpy, stripeSpy } =
      setupSpies();
    snackBar = snackBarSpy;
    httpClient = httpClientSpy;
    environment = environmentSpy;
    stripe = stripeSpy;

    httpClient.post.and.returnValue(of({ status: 200, id: 'session123' }));

    TestBed.configureTestingModule({
      providers: [
        { provide: MatSnackBar, useValue: snackBar },
        { provide: HttpClient, useValue: httpClient },
        { provide: EnvironmentService, useValue: environment },
        { provide: StripeService, useValue: stripe },
      ],
    });

    service = TestBed.inject(CartService);
    service.cart = new BehaviorSubject<Cart>({
      items: [],
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add one cart item to cart', () => {
    const cartItem = {
      product: 'Test 1',
      name: 'test name 1',
      price: 100,
      quantity: 1,
      id: 1,
    };
    service.addToCart(cartItem);
    expect(service.cart.value).toEqual({
      items: [
        {
          product: 'Test 1',
          name: 'test name 1',
          price: 100,
          quantity: 1,
          id: 1,
        },
      ],
    });
    expect(snackBar.open).toHaveBeenCalledTimes(1);
    expect(snackBar.open).toHaveBeenCalledWith('1 item added to cart', 'Ok', {
      duration: 3000,
    });
  });

  it('should increase the quantity by 1 if same cart item is added again', () => {
    const cartItem = {
      product: 'Test 1',
      name: 'test name 1',
      price: 100,
      quantity: 1,
      id: 1,
    };
    service.cart = new BehaviorSubject<Cart>({
      items: [cartItem],
    });
    service.addToCart(cartItem);
    expect(service.cart.value).toEqual({
      items: [
        {
          product: 'Test 1',
          name: 'test name 1',
          price: 100,
          quantity: 2,
          id: 1,
        },
      ],
    });
    expect(snackBar.open).toHaveBeenCalledTimes(1);
    expect(snackBar.open).toHaveBeenCalledWith('1 item added to cart', 'Ok', {
      duration: 3000,
    });
  });

  it('should remove one item from cart', () => {
    const cartItem = {
      product: 'Test 1',
      name: 'test name 1',
      price: 100,
      quantity: 1,
      id: 1,
    };
    service.cart = new BehaviorSubject<Cart>({
      items: [cartItem],
    });
    service.removeFromCart(cartItem);
    expect(service.cart.value).toEqual({
      items: [],
    });
    expect(snackBar.open).toHaveBeenCalledTimes(1);
    expect(snackBar.open).toHaveBeenCalledWith(
      '1 item removed from cart',
      'Ok',
      {
        duration: 3000,
      }
    );
  });

  it('should get total price of all cart items', () => {
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
    expect(service.getTotal(cartItems)).toBe(400);
  });

  it('should remove one quantity from a cart item', () => {
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
    const removeFromCartSpy = spyOn(service, 'removeFromCart');
    service.cart = new BehaviorSubject<Cart>({ items: cartItems });
    service.removeQuantity(cartItems[0]);
    expect(service.cart.value).toEqual({
      items: [
        {
          product: 'Test 1',
          name: 'test name 1',
          price: 100,
          quantity: 1,
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
    expect(removeFromCartSpy).not.toHaveBeenCalled();
  });

  it('should remove item from cart if quantity is 0 after removing one quantity from a cart item', () => {
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
    const removeFromCartSpy = spyOn(
      service,
      'removeFromCart'
    ).and.callThrough();

    service.cart = new BehaviorSubject<Cart>({ items: cartItems });
    service.removeQuantity(cartItems[1]);
    expect(service.cart.value).toEqual({
      items: [cartItems[0]],
    });
    expect(removeFromCartSpy).toHaveBeenCalledTimes(1);
    expect(snackBar.open).toHaveBeenCalledTimes(1);
    expect(snackBar.open).toHaveBeenCalledWith(
      '1 item removed from cart',
      'Ok',
      {
        duration: 3000,
      }
    );
  });

  it('should show "cart is already empty" when attempting to clear an empty cart', () => {
    expect(service.cart.value).toEqual({ items: [] });
    service.clearCart();
    expect(snackBar.open).toHaveBeenCalledTimes(1);
    expect(snackBar.open).toHaveBeenCalledWith('Cart is already empty', 'Ok', {
      duration: 3000,
    });
  });

  it('should checkout cart items', () => {
    const cartItems: CartItem[] = [
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
    service.checkout(cartItems);
    expect(httpClient.post).toHaveBeenCalledTimes(1);
    expect(httpClient.post).toHaveBeenCalledWith('api_url', {
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
    expect(stripe.checkout).toHaveBeenCalledTimes(1);
    expect(stripe.checkout).toHaveBeenCalledWith('sk123', 'session123');
  });
});
