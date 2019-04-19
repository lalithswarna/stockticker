import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { map } from 'rxjs/operators';
import { alphavantageSettings } from '../appsettings';

@Injectable()
export class AutoCompleteService {
  constructor(private http: HttpClient) { }
  url = 'http://localhost:4000';
  getUsers() {
    return this
            .http
            .get(`${this.url}/companyList`);
        }
        
        search(term) {
                return this.http.get(alphavantageSettings.symbolsBaseUrl + term +'&apikey=' + alphavantageSettings.apikey)
                .pipe(
                    debounceTime(500),  // WAIT FOR 500 MILISECONDS ATER EACH KEY STROKE.
                    map(
                        (data: any) => {
                            return (
                                data.length != 0 ? data as any : null
                            );
                        }
                ));
                }
        getSymbolData() {
          return this
                  .http
                  .get(`${this.url}/companies`);
              }

}