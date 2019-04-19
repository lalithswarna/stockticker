import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { debounceTime } from 'rxjs/operators';

@Injectable()
export class StockService {
  constructor(private http: HttpClient) { }
  url = 'http://localhost:4000';
  getUsers() {
    return this
            .http
            .get(`${this.url}/companies`)
            .pipe(
              debounceTime(500)
            );
        }
}