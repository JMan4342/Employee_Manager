import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { Employee } from '../../../shared/classes/employee';
import { ReactiveFormsModule, FormControl, FormsModule } from '@angular/forms';
import { IftaLabelModule } from 'primeng/iftalabel';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { EmployeeListService } from '../../employee-list.service';
import { Login } from '../../../shared/classes/login';
import { LoginService } from '../../../login/login.service';
import { sortBy as _sortBy } from 'lodash';

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
export class EmployeeFormComponent implements OnChanges {
  @Input() inFormState: string = '';
  @Input() inEmployee: Employee = new Employee();
  @Output() outModalState = new EventEmitter<number>();
  @Output() outModalVisible = new EventEmitter<boolean>();

  employeeList = this.employeeListService.employeeListSig;

  employee: Employee = new Employee();
  login: Login = new Login();

  // PLACEHOLDERS FOR DROPDOWNS
  tempAccessLvl: number[] = [1, 2, 3, 4, 5, 6];
  tempManager: string[] = ['Davis, Tom', 'Helen, Pam', 'Smith, Carol'];
  tempPosition: string[] = [
    'President',
    'Vice President',
    'Manager',
    'Supervisor',
    'Senior Associate',
    'Associate',
  ];
  tempDepartment: string[] = [
    'Executive',
    'HR',
    'IT',
    'Marketing',
    'Operations',
    'Sales',
  ];

  constructor(
    private employeeListService: EmployeeListService,
    private loginService: LoginService
  ) {}

  ngOnChanges() {
    if (this.inFormState == 'Edit') {
      this.employee = this.inEmployee;
      this.employee.StartDate = new Date(this.employee.StartDate);
    } else {
      this.employee = new Employee();
    }
  }

  saveEmployee(): void {
    if (this.inFormState == 'New') {
      this.addEmployee();
    }
    if (this.inFormState == 'Edit') {
      this.updateEmployee();
    }
  }

  addEmployee(): void {
    console.log(this.employee);
    this.employee.FullName =
      this.employee.LastName + ', ' + this.employee.FirstName;

    let username = '';
    username = this.employee.FirstName?.slice(0, 3) + this.employee.LastName;
    username = username.toLowerCase();
    this.verifyDupUsername();

    // this.employee.Username = username;

    let sortedEmpList = _sortBy(this.employeeList(), 'EmpId');
    let lastEmployee = sortedEmpList[sortedEmpList.length - 1];

    this.employee.EmpId = lastEmployee.EmpId ? lastEmployee.EmpId + 1 : 1;

    this.login = {
      EmpId: this.employee.EmpId,
      Username: this.employee.Username,
      Password: 'demo123',
      AccessLevel: this.employee.AccessLevel,
      ITAccess: this.employee.Department == 'IT' ? true : false,
    };

    console.log('Login Info: ', this.login);

    this.employeeListService.addEmployee(this.employee).subscribe({
      next: (results) => {
        console.log(results);
        this.employeeList().push(this.employee);
        this.employeeListService.updateEmployeeLists(this.employeeList());
        this.employee = new Employee();
        this.createEmpLogin();
        this.closeModal();
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

  updateEmployee(): void {
    this.employee.FullName =
      this.employee.LastName + ', ' + this.employee.FirstName;

    this.employeeListService.updateEmployee(this.employee).subscribe({
      next: (results) => {
        console.log(results);
        this.updateEmpLogin(this.employee.EmpId, this.employee.AccessLevel);
        this.employee = new Employee();
        this.closeModal();
      },
      error: (err) => console.log(err),
    });
  }

  updateEmpLogin(empId: number, accessLevel: number): void {
    this.loginService.updateEmpLogin(empId, accessLevel).subscribe({
      next: (results) => {
        console.log(results);
      },
      error: (err) => console.log(err),
    });
  }

  updateAccessLevel(position?: string): void {
    if (position == 'President') {
      this.employee.AccessLevel = 6;
    }
    if (position == 'Vice President') {
      this.employee.AccessLevel = 5;
    }
    if (position == 'Manager') {
      this.employee.AccessLevel = 4;
    }
    if (position == 'Supervisor') {
      this.employee.AccessLevel = 3;
    }
    if (position == 'Senior Associate') {
      this.employee.AccessLevel = 2;
    }
    if (position == 'Associate') {
      this.employee.AccessLevel = 1;
    }
  }

  verifyDupUsername(): void {
    let username = '';
    username = this.employee.FirstName?.slice(0, 3) + this.employee.LastName;
    username = username.toLowerCase();

    if (this.employeeList().filter(x => x.Username?.replace(/\d+/g, '').trim() == username).length > 0) {
      console.log(this.employeeList().filter(x => x.Username?.replace(/\d+/g, '').trim() == username));
      let tempDupList = this.employeeList().filter(x => x.Username?.replace(/\d+/g, '').trim() == username);
      tempDupList = _sortBy(tempDupList, 'Username');

      let lastDupName = tempDupList[tempDupList.length - 1].Username;
      let lastInstanceString = lastDupName?.slice(username.length);
      let lastInstanceNum = Number(lastInstanceString);
      let nextInstance = (lastInstanceNum + 1).toString();
      let newUsername = username + nextInstance;
      console.log(newUsername);

      this.employee.Username = newUsername;
    } else {
      this.employee.Username = username;
    };
  }

  closeModal(): void {
    this.outModalState.emit(0);
    this.outModalVisible.emit(false);
  }
}
