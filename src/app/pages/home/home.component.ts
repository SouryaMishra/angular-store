import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { StoreService } from 'src/app/services/store.service';

const ROW_HEIGHTS: Record<number, number> = {
  1: 400,
  3: 335,
  4: 350,
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [],
})
export class HomeComponent implements OnInit, OnDestroy {
  cols = 3;
  get rowHeight() {
    return ROW_HEIGHTS[this.cols];
  }
  category?: string;
  products: Product[] = [];
  sort = 'desc';
  count = '12';
  productsSubscription?: Subscription;

  constructor(
    private cartService: CartService,
    private storeService: StoreService
  ) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productsSubscription = this.storeService
      .getAllProducts(this.count, this.sort, this.category)
      .subscribe((products) => (this.products = products));
  }

  onColumnsCountChange(colsNum: number): void {
    this.cols = colsNum;
  }

  onSortChange(newSort: string) {
    this.sort = newSort;
    this.getProducts();
  }

  onItemsCountChange(newCount: number) {
    this.count = newCount.toString();
    this.getProducts();
  }

  onShowCategory(newCategory: string): void {
    this.category = newCategory;
    this.getProducts();
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id,
    });
  }

  ngOnDestroy() {
    if (this.productsSubscription) this.productsSubscription.unsubscribe();
  }
}
