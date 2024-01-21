import { Component, Input } from '@angular/core';
import { Cart } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [],
})
export class HeaderComponent {
  private _cart: Cart = { items: [] };
  itemsQuantity = 0;

  @Input()
  get cart(): Cart {
    return this._cart;
  }

  set cart(cart: Cart) {
    this._cart = cart;
    this.itemsQuantity = cart.items.length;
  }

  constructor(private cartService: CartService) {}

  getTotal(): number {
    return this.cartService.getTotal(this.cart.items);
  }

  onClearCart() {
    this.cartService.clearCart();
  }
}
