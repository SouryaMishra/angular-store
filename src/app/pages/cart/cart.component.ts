import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: [],
})
export class CartComponent implements OnInit {
  cart: Cart = {
    items: [
      {
        product: 'https://via.placeholder.com/150',
        name: 'snickers',
        price: 150,
        quantity: 1,
        id: 1,
      },
    ],
  };
  dataSource: CartItem[] = [];
  displayedColumns: string[] = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action',
  ];

  constructor(private cartService: CartService, private http: HttpClient) {}

  ngOnInit() {
    this.cartService.cart.subscribe((cart) => {
      this.cart = cart;
      this.dataSource = this.cart.items;
    });
  }

  getTotal(): number {
    return this.cartService.getTotal(this.cart.items);
  }

  onClearCart() {
    this.cartService.clearCart();
  }

  onRemoveItem(item: CartItem) {
    this.cartService.removeFromCart(item);
  }

  onAddQuantity(item: CartItem) {
    this.cartService.addToCart(item);
  }

  onRemoveQuantity(item: CartItem) {
    this.cartService.removeQuantity(item);
  }

  onCheckout() {
    const { apiUrl, stripeKey = '' } = environment;

    this.http
      .post(apiUrl, {
        items: this.cart.items,
      })
      .subscribe(async (res: any) => {
        const stripe = await loadStripe(stripeKey);
        stripe?.redirectToCheckout({
          sessionId: res.id,
        });
      });
  }
}
