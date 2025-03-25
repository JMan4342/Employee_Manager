import { Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { NavbarComponent } from './navbar.component';
import { HomeComponent } from '../home/home.component';
import { EmployeeListComponent } from '../employee-list/employee-list.component';
import { authorizationGuard } from '../authorization.guard';

export const routes: Routes = [
  {
    path: '',
    component: NavbarComponent,
    canActivate: [authorizationGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'employees', component: EmployeeListComponent },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: '**', component: LoginComponent },
];
