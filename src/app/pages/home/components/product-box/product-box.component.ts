import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrls: [],
})
export class ProductBoxComponent {
  @Input() fullWidthMode = false;
}
