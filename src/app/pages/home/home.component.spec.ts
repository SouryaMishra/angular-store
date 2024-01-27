import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { CartService } from 'src/app/services/cart.service';
import { StoreService } from 'src/app/services/store.service';
import { ActivatedRoute } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FiltersComponent } from './components/filters/filters.component';
import { ProductsHeaderComponent } from './components/products-header/products-header.component';
import { ProductBoxComponent } from './components/product-box/product-box.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let cartService = {
    clearCart() {},
    addToCart() {},
  };
  let storeService: Partial<StoreService> = {
    getAllProducts() {
      return of([
        {
          id: 1,
          title: 'Seagate',
          price: 2000,
          category: 'electronics',
          description: 'External hard drive',
          image: 'hdd.png',
        },
        {
          id: 2,
          title: 'Nike',
          price: 1000,
          category: 'shoes',
          description: 'Just do it',
          image: 'shoe.png',
        },
      ]);
    },
    getAllCategories() {
      return of([]);
    },
  };
  let route = {
    snapshot: {
      queryParamMap: {
        get: () => {},
      },
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatSidenavModule,
        MatGridListModule,
        MatExpansionModule,
        MatListModule,
        MatCardModule,
        MatMenuModule,
        MatIconModule,
      ],
      declarations: [
        HomeComponent,
        FiltersComponent,
        ProductsHeaderComponent,
        ProductBoxComponent,
      ],
      providers: [
        { provide: CartService, useValue: cartService },
        { provide: StoreService, useValue: storeService },
        { provide: ActivatedRoute, useValue: route },
      ],
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render product box component', () => {
    expect(component.products.length).toBe(2);
    const productBoxes = fixture.debugElement.queryAll(
      By.css('app-product-box')
    );
    expect(productBoxes.length).toBe(2);
  });

  it('should call method of store service with expected arguments', () => {
    const storeServiceInjected =
      fixture.debugElement.injector.get(StoreService);
    const getAllProductsSpy = spyOn(
      storeServiceInjected,
      'getAllProducts'
    ).and.callThrough();

    component.onSortChange('asc');
    expect(getAllProductsSpy).toHaveBeenCalledWith('12', 'asc', undefined);

    component.onItemsCountChange(24);
    expect(getAllProductsSpy).toHaveBeenCalledWith('24', 'asc', undefined);

    component.onShowCategory('shoes');
    expect(getAllProductsSpy).toHaveBeenCalledWith('24', 'asc', 'shoes');
  });

  it('should call checkout method of cart service', () => {
    const cartServiceInjected = fixture.debugElement.injector.get(CartService);
    const addToCartSpy = spyOn(cartServiceInjected, 'addToCart');

    component.onAddToCart({
      id: 2,
      title: 'Nike',
      price: 1000,
      category: 'shoes',
      description: 'Just do it',
      image: 'shoe.png',
    });
    expect(addToCartSpy).toHaveBeenCalledWith({
      id: 2,
      product: 'shoe.png',
      name: 'Nike',
      price: 1000,
      quantity: 1,
    });
  });
});
