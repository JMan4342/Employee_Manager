import { Component } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { TabsModule } from 'primeng/tabs';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
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
  employeeList: Employee[] = [];
  searchTerm: string | undefined = undefined;
  activeValue: number = 0;
  value: number = 0;
  modalVisible: boolean = false;
  modalShown: number = 0;
  formState: string | undefined = undefined;

  cols: Column[] = [];

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

    this.cols = [
      { field: 'EmpId', header: 'Id' },
      { field: 'FullName', header: 'Name' },
      { field: 'Title', header: 'Title' },
      { field: 'Position', header: 'Position' },
      { field: 'StartDate', header: 'Start Date' },
      { field: 'AccessLevel', header: 'Access Level'}
    ];
  }

  getEmployees(): void {
    this.employeeListService.getEmployees().subscribe({
      next: (results) => {
        this.employeeList = results;
        console.log(this.employeeList);
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

  editEmployee(employee: Employee): void {
    console.log("Edit Employee Clicked", employee);
  }

  archiveEmployee(employee: Employee): void {
    console.log("Archive Employee Clicked", employee);
  }
}
