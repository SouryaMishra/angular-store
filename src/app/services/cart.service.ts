import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = new BehaviorSubject<Cart>({ items: [] });

  constructor(private _snackBar: MatSnackBar) {}

  addToCart(itemToAdd: CartItem): void {
    const items = [...this.cart.value.items];
    const itemInCart = items.find((item) => item.id == itemToAdd.id);

    if (itemInCart) itemInCart.quantity += 1;
    else items.push(itemToAdd);

    this.cart.next({ items });
    this._snackBar.open('1 item added to cart', 'Ok', { duration: 3000 });
  }

  removeFromCart(itemToRemove: CartItem) {
    const filteredItems = this.cart.value.items.filter(
      (item) => item.id !== itemToRemove.id
    );

    this.cart.next({ items: filteredItems });
    this._snackBar.open('1 item removed from cart', 'Ok', { duration: 3000 });
  }

  getTotal(items: CartItem[]): number {
    return items.reduce(
      (total, { price, quantity }) => (total += price * quantity),
      0
    );
  }

  clearCart() {
    if (this.cart.value.items.length === 0) {
      this._snackBar.open('Cart is already empty', 'Ok', { duration: 3000 });
      return;
    }
    this.cart.next({ items: [] });
    this._snackBar.open('Cart is cleared', 'Ok', { duration: 3000 });
  }

  removeQuantity(item: CartItem) {
    const items = [...this.cart.value.items];
    const itemInCart = items.find((_item) => _item.id == item.id);

    if (itemInCart) {
      itemInCart.quantity -= 1;
      if (itemInCart.quantity === 0) this.removeFromCart(itemInCart);
      else this.cart.next({ items });
    }
  }
}
