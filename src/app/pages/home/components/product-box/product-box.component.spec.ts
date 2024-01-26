import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { ProductBoxComponent } from './product-box.component';
import { By } from '@angular/platform-browser';

describe('ProductBoxComponent', () => {
  let component: ProductBoxComponent;
  let fixture: ComponentFixture<ProductBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatIconModule],
      declarations: [ProductBoxComponent],
    });
    fixture = TestBed.createComponent(ProductBoxComponent);
    component = fixture.componentInstance;
    component.product = {
      id: 1,
      title: 'Seagate',
      price: 2000,
      category: 'electronics',
      description: 'External hard drive',
      image: 'hdd.png',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not show product description without full width mode', () => {
    const description = fixture.debugElement.query(
      By.css('[data-testid="tid-description"]')
    );
    expect(description).toBeNull();
  });

  it('should show all product details in full width mode', () => {
    component.fullWidthMode = true;

    fixture.detectChanges();

    const title = fixture.debugElement.query(
      By.css('[data-testid="tid-title"]')
    );
    const category = fixture.debugElement.query(
      By.css('[data-testid="tid-category"]')
    );
    const description = fixture.debugElement.query(
      By.css('[data-testid="tid-description"]')
    );
    const price = fixture.debugElement.query(
      By.css('[data-testid="tid-price"]')
    );
    const image = fixture.debugElement.query(
      By.css('[data-testid="tid-image"]')
    );

    expect(title.nativeElement.textContent).toContain('Seagate');
    expect(category.nativeElement.textContent).toContain('Electronics');
    expect(description.nativeElement.textContent).toContain(
      'External hard drive'
    );
    expect(price.nativeElement.textContent).toContain('2,000');
    expect(image.nativeElement.src).toContain('hdd.png');
    expect(image.nativeElement.alt).toContain('Seagate');
  });
});
