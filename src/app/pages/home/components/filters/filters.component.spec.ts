import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersComponent } from './filters.component';
import { StoreService } from 'src/app/services/store.service';
import { Observable, of } from 'rxjs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;
  let storeService: Partial<StoreService> = {
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

  it('should display categories', () => {
    const panelHeader = fixture.debugElement.query(
      By.css('mat-expansion-panel-header')
    );
    const listOptions = fixture.debugElement.queryAll(
      By.css('mat-list-option')
    );

    panelHeader.triggerEventHandler('click');

    expect(listOptions.length).toBe(2);
    expect(listOptions[0].nativeElement.textContent).toContain('Electronics');
    expect(listOptions[1].nativeElement.textContent).toContain('Shoes');
  });

  it('should emit event with selected category', () => {
    let selectedCategory: any;
    component.showCategory.subscribe(
      (category) => (selectedCategory = category)
    );

    const panelHeader = fixture.debugElement.query(
      By.css('mat-expansion-panel-header')
    );
    const listOptions = fixture.debugElement.queryAll(
      By.css('mat-list-option')
    );

    panelHeader.triggerEventHandler('click');

    listOptions[0].triggerEventHandler('click');
    expect(selectedCategory).toBe('electronics');

    listOptions[1].triggerEventHandler('click');
    expect(selectedCategory).toBe('shoes');
  });
});
