import { Component } from '@angular/core';

const ROW_HEIGHTS: Record<number, number> = {
  1: 400,
  3: 335,
  4: 350,
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [],
})
export class HomeComponent {
  cols = 3;
  get rowHeight() {
    return ROW_HEIGHTS[this.cols];
  }
  category?: string;

  onColumnsCountChange(colsNum: number): void {
    this.cols = colsNum;
  }

  onShowCategory(newCategory: string): void {
    this.category = newCategory;
  }
}
