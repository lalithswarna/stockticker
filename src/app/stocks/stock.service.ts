import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { debounceTime } from 'rxjs/operators';
import { alphavantageSettings } from '../appsettings';

@Injectable()
export class StockService {
  constructor(private http: HttpClient) { }
  url = alphavantageSettings.jsonServerUrl;
  getUsers() {
    return this
            .http
            .get(`${this.url}/companies`)
            .pipe(
              debounceTime(500)
            );
        }
}