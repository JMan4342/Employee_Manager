import { Component } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { TabsModule } from 'primeng/tabs';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Table, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EmployeeFormComponent } from './modals/employee-form/employee-form.component';
import { EmployeeListService } from './employee-list.service';
import { Employee } from '../shared/classes/employee';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    ToolbarModule,
    TabsModule,
    InputTextModule,
    ButtonModule,
    DialogModule,
    TableModule,
    CommonModule,
    FormsModule,
    EmployeeFormComponent,
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
})
export class EmployeeListComponent {
  activeEmployeeList = this.employeeListService.activeEmployeesSig;
  archivedEmployeeList = this.employeeListService.archivedEmployeesSig;

  editEmployee: Employee = new Employee();
  employeeList: Employee[] = [];
  // searchTerm: string | undefined = undefined;
  activeValue: number = 0;
  value: number = 0;
  modalVisible: boolean = false;
  modalShown: number = 0;
  formState: string = '';

  activeCols: Column[] = [];
  archiveCols: Column[] = [];

  // verifyValue(): boolean {
  //   let showAddButton = true;
  //   if (this.value != 0) {
  //     showAddButton = false;
  //   };
  //   return showAddButton;
  // }
  constructor(private employeeListService: EmployeeListService) {}

  ngOnInit(): void {
    this.getEmployees();

    this.activeCols = [
      { field: 'EmpId', header: 'Id' },
      { field: 'FullName', header: 'Name' },
      { field: 'Title', header: 'Title' },
      { field: 'Position', header: 'Position' },
      { field: 'StartDate', header: 'Start Date' },
      { field: 'AccessLevel', header: 'Access Level' },
    ];

    this.archiveCols = [
      { field: 'EmpId', header: 'Id' },
      { field: 'FullName', header: 'Name' },
      { field: 'Title', header: 'Title' },
      { field: 'Position', header: 'Position' },
      { field: 'StartDate', header: 'Start Date' },
    ];
  }

  getEmployees(): void {
    this.employeeListService.getEmployees().subscribe({
      next: (results) => {
        this.employeeList = results;
        console.log(this.employeeList);
        this.employeeListService.updateEmployeeLists(this.employeeList);
      },
      error: (err) => console.log(err),
    });
  }

  updateActiveValue(value: number): void {
    value = this.activeValue;
  }

  openEmpForm(state: string): void {
    this.modalVisible = true;
    this.modalShown = 1;
    this.formState = state;
  }

  updateEmployee(state: string, employee: Employee): void {
    console.log('Edit Employee Clicked', employee);
    if (state == 'Edit') {
      this.editEmployee = employee;
    }
    this.openEmpForm('Edit');
  }

  archiveEmployee(employee: Employee): void {
    console.log('Archive Employee Clicked: ', employee);
    employee.Archived = true;
    this.employeeListService.updateEmployee(employee).subscribe({
      next: (results) => {
        console.log(results);
        this.employeeList.map((emp) =>
          emp.EmpId == employee.EmpId ? { ...emp, Archived: true } : emp
        );
        this.employeeListService.updateEmployeeLists(this.employeeList);
      },
      error: (err) => console.log(err),
    });
  }

  reactivateEmployee(employee: Employee): void {
    console.log('Reactived Employee: ', employee);
    employee.Archived = false;
    this.employeeListService.updateEmployee(employee).subscribe({
      next: (results) => {
        console.log(results);
        this.employeeList.map((emp) =>
          emp.EmpId == employee.EmpId ? { ...emp, Archived: false } : emp
        );
        this.employeeListService.updateEmployeeLists(this.employeeList);
      },
      error: (err) => console.log(err),
    });
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
