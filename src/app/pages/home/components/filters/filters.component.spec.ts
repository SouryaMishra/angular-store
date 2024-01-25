import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersComponent } from './filters.component';
import { StoreService } from 'src/app/services/store.service';
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;
  let storeService = {
    getAllProducts(): Observable<Product[]> {
      return of([
        {
          id: 1,
          title: 'Title',
          price: 200,
          category: 'Category',
          description: 'Description',
          image: 'image.png',
        },
      ]);
    },
    getAllCategories(): Observable<string[]> {
      return of(['electronics', 'shoes']);
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, MatExpansionModule, MatListModule],
      declarations: [FiltersComponent],
      providers: [{ provide: StoreService, useValue: storeService }],
    });
    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
