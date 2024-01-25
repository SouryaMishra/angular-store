import { TestBed } from '@angular/core/testing';

import { StoreService } from './store.service';
import { setupSpies } from './spies';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EnvironmentService } from './environment.service';

describe('StoreService', () => {
  let service: StoreService;
  let httpClient: any;
  let environment: any;

  const { httpClientSpy, environmentSpy } = setupSpies();
  httpClient = httpClientSpy;
  environment = environmentSpy;

  httpClient.get.and.returnValue(
    of([
      {
        id: 1,
        title: 'Title',
        price: 200,
        category: 'Category',
        description: 'Description',
        image: 'image.png',
      },
    ])
  );

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: httpClient },
        { provide: EnvironmentService, useValue: environment },
      ],
    });
    service = TestBed.inject(StoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
