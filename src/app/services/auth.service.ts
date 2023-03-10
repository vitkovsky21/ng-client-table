import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const AUTH_API = 'https://api.asgk-group.ru/test-auth-only';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN = 'auth';
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(private http: HttpClient) {
    this._isLoggedIn$.next(!!this.tokenData);
  }

  get tokenData() {
    return localStorage.getItem(this.TOKEN);
  }

  login(login: string, password: string) {
    this._isLoggedIn$.next(true);

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
