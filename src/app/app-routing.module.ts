import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router';
import { IsAuthGuard } from './auth.guard';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  {
    path: 'main',
    component: MainComponent,
    canActivate: [IsAuthGuard]
  },
  {
    path: '',
    component: LoginComponent,
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
