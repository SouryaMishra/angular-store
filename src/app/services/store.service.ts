import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { EnvironmentService } from './environment.service';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(
    private httpClient: HttpClient,
    private environment: EnvironmentService
  ) {}

  getAllProducts(
    limit = '12',
    sort = 'desc',
    category?: string
  ): Observable<Product[]> {
    return this.httpClient.get<Product[]>(
      `${this.environment.getConfig().storeBaseUrl}/products${
        category ? `/category/${category}` : ''
      }?sort=${sort}&limit=${limit}`
    );
  }

  getAllCategories(): Observable<string[]> {
    return this.httpClient.get<string[]>(
      `${this.environment.getConfig().storeBaseUrl}/products/categories`
    );
  }
}
