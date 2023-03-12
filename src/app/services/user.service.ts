import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'https://api.asgk-group.ru/v1/';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(token: string): Observable<any> {
    return this.http.get(API_URL + token + '/passes', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: window.sessionStorage['auth-user']
          ? window.sessionStorage['auth-user'].slice(1, -1)
          : window.sessionStorage['auth-user'],
      }),
    });
  }

  messageToUsers(token: string, data: any): Observable<any> {
    console.log(data)
    return this.http.post(API_URL + token + '/message/push', data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: window.sessionStorage['auth-user']
          ? window.sessionStorage['auth-user'].slice(1, -1)
          : window.sessionStorage['auth-user'],
      }),
    });
  }

}
