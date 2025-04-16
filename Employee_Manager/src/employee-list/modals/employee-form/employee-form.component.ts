import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Employee } from '../../../shared/classes/employee';
import { ReactiveFormsModule, FormControl, FormsModule } from '@angular/forms';
import { IftaLabelModule } from 'primeng/iftalabel';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { EmployeeListService } from '../../employee-list.service';
import { Login } from '../../../shared/classes/login';
import { LoginService } from '../../../login/login.service';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IftaLabelModule,
    SelectModule,
    ButtonModule,
    DatePickerModule,
  ],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css',
})
export class EmployeeFormComponent {
  employee: Employee = new Employee();
  login: Login = new Login();

  // PLACEHOLDERS FOR DROPDOWNS
  tempAccessLvl: number[] = [1, 2, 3, 4, 5, 6];
  tempManager: string[] = ['Davis, Tom', 'Helen, Pam', 'Smith, Carol'];
  tempPosition: string[] = [
    'IT',
    'HR',
    'President',
    'Vice President',
    'Manager',
    'Supervisor',
    'Senior Associate',
    'Associate',
  ];

  constructor(
    private employeeListService: EmployeeListService,
    private loginService: LoginService
  ) {}

  addEmployee(): void {
    console.log(this.employee);
    this.employee.FullName =
      this.employee.LastName + ', ' + this.employee.FirstName;

    let username = '';
    username = this.employee.FirstName?.slice(0, 3) + this.employee.LastName;
    username = username.toLowerCase();

    this.login = {
      EmpId: null,
      Username: username,
      Password: 'demo123',
      AccessLevel: this.employee.AccessLevel,
      ITAccess: this.employee.Position == 'IT' ? true : false,
    };

    console.log('Login Info: ', this.login);

    this.employeeListService.addEmployee(this.employee).subscribe({
      next: (results) => {
        console.log(results);
        this.employee = new Employee();
        this.createEmpLogin();
      },
      error: (err) => console.log(err),
    });
  }

  createEmpLogin(): void {
    this.loginService.addUserLogin(this.login).subscribe({
      next: (results) => {
        console.log(results);
      },
      error: (err) => console.log(err),
    });
  }
}
