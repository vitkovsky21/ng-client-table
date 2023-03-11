import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'https://api.asgk-group.ru/v1/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: window.sessionStorage['auth-user'].slice(1, -1),
  }),
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(token: string): Observable<any> {
    return this.http.get(API_URL + token + '/passes', httpOptions);
  }
}
