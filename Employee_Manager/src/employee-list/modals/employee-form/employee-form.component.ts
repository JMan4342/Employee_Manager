import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Employee } from '../../../shared/classes/employee';
import { ReactiveFormsModule, FormControl, FormsModule } from '@angular/forms';
import { IftaLabelModule } from 'primeng/iftalabel';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { EmployeeListService } from '../../employee-list.service';

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
    DatePickerModule
  ],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css',
})
export class EmployeeFormComponent {
  employee: Employee = new Employee();

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

  constructor(private employeeListService: EmployeeListService) {}

  addEmployee(): void {
    console.log(this.employee);
    this.employee.FullName = this.employee.LastName + ', ' + this.employee.FirstName;    

    this.employeeListService.addEmployee(this.employee).subscribe({
      next: (results) => {
        console.log(results);
        this.employee = new Employee;
      },
      error: (err) => console.log(err),      
    });
  }
}
