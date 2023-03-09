import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const AUTH_API = 'https://api.asgk-group.ru/test-auth-only';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  login(login: string, password: string) {
    return this.http.post(
      AUTH_API,
      {
        login,
        password,
      },
      httpOptions
    );
  }
}
