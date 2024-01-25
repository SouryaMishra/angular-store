import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { HeaderComponent } from './header.component';
import { CartService } from 'src/app/services/cart.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let cartService = {
    getTotal: () => {},
    clearCart: () => {},
    checkout: () => {},
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatToolbarModule, MatIconModule, MatMenuModule, MatBadgeModule],
      declarations: [HeaderComponent],
      providers: [{ provide: CartService, useValue: cartService }],
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
