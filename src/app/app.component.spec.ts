import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CartService } from './services/cart.service';
import { BehaviorSubject } from 'rxjs';
import { Cart } from './models/cart.model';
import { HeaderComponent } from './components/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('AppComponent', () => {
  const cartService = {
    cart: new BehaviorSubject<Cart>({ items: [] }),
  };
  beforeEach(() => {
    return TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatSidenavModule,
        MatGridListModule,
        MatMenuModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatExpansionModule,
        MatListModule,
        MatToolbarModule,
        MatTableModule,
        MatBadgeModule,
        MatSnackBarModule,
      ],
      declarations: [AppComponent, HeaderComponent],
      providers: [{ provide: CartService, useValue: cartService }],
    });
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'store'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('store');
  });
});
