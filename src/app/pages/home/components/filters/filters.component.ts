import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: [],
})
export class FiltersComponent {
  @Output() showCategory = new EventEmitter<string>();
  categories = ['shoes', 'sports', 'gadgets'];

  onShowCategory(category: string): void {
    this.showCategory.emit(category);
  }
}
