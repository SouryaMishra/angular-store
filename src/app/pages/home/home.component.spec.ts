import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { CartService } from 'src/app/services/cart.service';
import { StoreService } from 'src/app/services/store.service';
import { ActivatedRoute } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FiltersComponent } from './components/filters/filters.component';
import { ProductsHeaderComponent } from './components/products-header/products-header.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let cartService = {
    clearCart() {},
    addToCart() {},
  };
  let storeService = {
    getAllProducts() {
      return of([]);
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
      declarations: [HomeComponent, FiltersComponent, ProductsHeaderComponent],
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
});
