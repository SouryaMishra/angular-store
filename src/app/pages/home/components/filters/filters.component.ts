import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: [],
})
export class FiltersComponent implements OnInit, OnDestroy {
  @Output() showCategory = new EventEmitter<string>();
  categories: string[] = [];
  categoriesSubscription?: Subscription;

  constructor(private storeService: StoreService) {}

  ngOnInit() {
    this.categoriesSubscription = this.storeService
      .getAllCategories()
      .subscribe((categories) => (this.categories = categories));
  }

  onShowCategory(category: MatSelectionListChange): void {
    this.showCategory.emit(category.options[0].value as string);
  }

  ngOnDestroy() {
    if (this.categoriesSubscription) this.categoriesSubscription.unsubscribe();
  }
}
