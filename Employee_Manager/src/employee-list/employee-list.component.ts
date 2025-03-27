import { Component } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { TabsModule } from 'primeng/tabs';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    ToolbarModule,
    TabsModule,
    InputTextModule,
    ButtonModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
})
export class EmployeeListComponent {
  searchTerm: string | undefined = undefined;
  activeValue: number = 0;
  value: number = 0;

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
}
