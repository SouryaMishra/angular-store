import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {
  getConfig() {
    console.log({ environment });
    return { ...environment };
  }
}
