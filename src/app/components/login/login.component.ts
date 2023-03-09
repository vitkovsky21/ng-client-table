import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form = new FormGroup({
    login: new FormControl<any>(null, Validators.required),
    password: new FormControl<any>(null, Validators.required),
  });

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (this.authService.isLoggedIn$) {
      this.router.navigate(['/main']);
    }
  }

  submitForm() {
    if (this.form.invalid) {
      return;
    }

    this.authService
      .login(this.form.get('login')?.value, this.form.get('password')?.value)
      .subscribe((response) => {
        console.log(response)
        this.router.navigate(['/main']);
      });
  }
}
