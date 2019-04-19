import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { alphavantageSettings } from '../appsettings';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }
  url = alphavantageSettings.jsonServerUrl;
  getUsers() {
    return this
            .http
            .get(`${this.url}/results`);
        }
}