import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

import { ProductsHeaderComponent } from './products-header.component';

describe('ProductsHeaderComponent', () => {
  let component: ProductsHeaderComponent;
  let fixture: ComponentFixture<ProductsHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatCardModule,
        MatMenuModule,
        MatIconModule,
      ],
      declarations: [ProductsHeaderComponent],
    });
    fixture = TestBed.createComponent(ProductsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial sort type as descending', () => {
    const sortButton = fixture.debugElement.query(
      By.css('[data-testid="tid-sort-by"]')
    );
    expect(component.sort).toBe('desc');
    expect(sortButton.nativeElement.textContent).toContain('Descending');
  });

  it('should change sort type on button click', () => {
    const sortButton = fixture.debugElement.query(
      By.css('[data-testid="tid-sort-by"]')
    );

    sortButton.triggerEventHandler('click');
    fixture.detectChanges();

    const overlayContainer = document.querySelector('.cdk-overlay-container');
    const sortAscButton = overlayContainer?.querySelector(
      '[data-testid="tid-asc"]'
    ) as HTMLButtonElement;
    const sortDescButton = overlayContainer?.querySelector(
      '[data-testid="tid-desc"]'
    ) as HTMLButtonElement;

    sortAscButton.click();
    fixture.detectChanges();

    expect(component.sort).toBe('asc');
    expect(sortButton.nativeElement.textContent).toContain('Ascending');

    sortDescButton.click();
    fixture.detectChanges();

    expect(component.sort).toBe('desc');
    expect(sortButton.nativeElement.textContent).toContain('Descending');
  });

  it('should emit event with sort type on button click', () => {
    let sortType: any;
    const sortButton = fixture.debugElement.query(
      By.css('[data-testid="tid-sort-by"]')
    );

    sortButton.triggerEventHandler('click');
    fixture.detectChanges();

    const overlayContainer = document.querySelector('.cdk-overlay-container');
    const sortAscButton = overlayContainer?.querySelector(
      '[data-testid="tid-asc"]'
    ) as HTMLButtonElement;
    const sortDescButton = overlayContainer?.querySelector(
      '[data-testid="tid-desc"]'
    ) as HTMLButtonElement;

    component.sortChange.subscribe((type) => (sortType = type));

    sortAscButton.click();
    expect(sortType).toBe('asc');

    sortDescButton.click();
    expect(sortType).toBe('desc');
  });

  it('should have initial show count as 12', () => {
    const showCountButton = fixture.debugElement.query(
      By.css('[data-testid="tid-show-count"]')
    );
    expect(component.itemsShowCount).toBe(12);
    expect(showCountButton.nativeElement.textContent).toContain('12');
  });

  it('should change show count on button click', () => {
    const showCountButton = fixture.debugElement.query(
      By.css('[data-testid="tid-show-count"]')
    );

    showCountButton.triggerEventHandler('click');
    fixture.detectChanges();

    const overlayContainer = document.querySelector('.cdk-overlay-container');
    const count12button = overlayContainer?.querySelector(
      '[data-testid="tid-count-12"]'
    ) as HTMLButtonElement;
    const count24button = overlayContainer?.querySelector(
      '[data-testid="tid-count-24"]'
    ) as HTMLButtonElement;
    const count36button = overlayContainer?.querySelector(
      '[data-testid="tid-count-36"]'
    ) as HTMLButtonElement;

    count24button.click();
    fixture.detectChanges();

    expect(component.itemsShowCount).toBe(24);
    expect(showCountButton.nativeElement.textContent).toContain('24');

    count36button.click();
    fixture.detectChanges();

    expect(component.itemsShowCount).toBe(36);
    expect(showCountButton.nativeElement.textContent).toContain('36');

    count12button.click();
    fixture.detectChanges();

    expect(component.itemsShowCount).toBe(12);
    expect(showCountButton.nativeElement.textContent).toContain('12');
  });

  it('should emit event with show count on button click', () => {
    const showCountButton = fixture.debugElement.query(
      By.css('[data-testid="tid-show-count"]')
    );

    showCountButton.triggerEventHandler('click');
    fixture.detectChanges();

    const overlayContainer = document.querySelector('.cdk-overlay-container');
    const count12button = overlayContainer?.querySelector(
      '[data-testid="tid-count-12"]'
    ) as HTMLButtonElement;
    const count24button = overlayContainer?.querySelector(
      '[data-testid="tid-count-24"]'
    ) as HTMLButtonElement;
    const count36button = overlayContainer?.querySelector(
      '[data-testid="tid-count-36"]'
    ) as HTMLButtonElement;

    let newCount: any;
    component.itemsCountChange.subscribe((count) => (newCount = count));

    count24button.click();
    expect(newCount).toBe(24);

    count36button.click();
    expect(newCount).toBe(36);

    count12button.click();
    expect(newCount).toBe(12);
  });

  it('should emit event with column count on button click', () => {
    const cols1Button = fixture.debugElement.query(
      By.css('[data-testid="tid-cols-1"]')
    );
    const cols3Button = fixture.debugElement.query(
      By.css('[data-testid="tid-cols-3"]')
    );
    const cols4Button = fixture.debugElement.query(
      By.css('[data-testid="tid-cols-4"]')
    );

    let newColCount: any;

    component.columnsCountChange.subscribe(
      (colCount) => (newColCount = colCount)
    );

    cols1Button.triggerEventHandler('click');
    expect(newColCount).toBe(1);

    cols3Button.triggerEventHandler('click');
    expect(newColCount).toBe(3);

    cols4Button.triggerEventHandler('click');
    expect(newColCount).toBe(4);
  });
});
