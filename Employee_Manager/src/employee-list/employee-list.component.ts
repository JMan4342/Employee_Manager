import { Component } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { TabsModule } from 'primeng/tabs';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EmployeeFormComponent } from './modals/employee-form/employee-form.component'

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    ToolbarModule,
    TabsModule,
    InputTextModule,
    ButtonModule,
    DialogModule,
    CommonModule,
    FormsModule,
    EmployeeFormComponent
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
})
export class EmployeeListComponent {
  searchTerm: string | undefined = undefined;
  activeValue: number = 0;
  value: number = 0;
  modalVisible: boolean = false;
  formState: string | undefined = undefined;

  // verifyValue(): boolean {
  //   let showAddButton = true;
  //   if (this.value != 0) {
  //     showAddButton = false;
  //   };
  //   return showAddButton;
  // }

  updateActiveValue(value: number): void {
    value = this.activeValue;
  }

  openEmpForm(state: string): void {
    this.modalVisible = true;
    this.formState = state;
  }
}
