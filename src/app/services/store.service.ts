import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private httpClient: HttpClient) {}

  getAllProducts(
    limit = '12',
    sort = 'desc',
    category?: string
  ): Observable<Product[]> {
    return this.httpClient.get<Product[]>(
      `${environment.storeBaseUrl}/products${
        category ? `/category/${category}` : ''
      }?sort=${sort}&limit=${limit}`
    );
  }

  getAllCategories(): Observable<string[]> {
    return this.httpClient.get<string[]>(
      `${environment.storeBaseUrl}/products/categories`
    );
  }
}
