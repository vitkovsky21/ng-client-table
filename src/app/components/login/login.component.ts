import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: any = {
    login: null,
    password: null,
  };
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn$) {
      this.router.navigate(['main']);
    }
  }

  onSubmit(): void {
    const { login, password } = this.form;

    this.authService.login(login, password).subscribe({
      next: (data: any) => {
        this.storageService.saveUser(data['auth_token']);
        this.router.navigate(['main']);
      },
      error: (err) => {
        this.errorMessage = err.error.message;
      },
    });
  }
}
