import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Employee } from '../shared/classes/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeListService {
  activeEmployeesSig = signal<Employee[]>([]);
  archivedEmployeesSig = signal<Employee[]>([]);

  private apiUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<any> {
    return this.http
      .get(`${this.apiUrl}api/employeeProfiles/getEmployeeProfiles`)
      .pipe(
        map((result) => {
          return result;
        })
      );
  }

  addEmployee(employee: Employee): Observable<any> {
    let body = {
      EmpId: employee.EmpId,
      FirstName: employee.FirstName,
      LastName: employee.LastName,
      FullName: employee.FullName,
      AccessLevel: employee.AccessLevel,
      Manager: employee.Manager,
      Position: employee.Position,
      Title: employee.Title,
      Archived: employee.Archived,
      StartDate: employee.StartDate,
      Department: employee.Department
    };

    return this.http
      .post(`${this.apiUrl}api/employeeProfiles/addEmployeeProfile`, body, {
        responseType: 'text',
      })
      .pipe(
        map((result) => {
          return result;
        })
      );
  }

  updateEmployee(employee: Employee): Observable<any> {
    let employeeBody = {
      // EmpId: employee.EmpId,
      FirstName: employee.FirstName,
      LastName: employee.LastName,
      FullName: employee.FullName,
      AccessLevel: employee.AccessLevel,
      Manager: employee.Manager,
      Position: employee.Position,
      Title: employee.Title,
      Archived: employee.Archived,
      StartDate: employee.StartDate,
      Department: employee.Department
    };

    return this.http
      .put(
        `${this.apiUrl}api/employeeProfiles/updateEmployeeProfile/${employee.EmpId}`,
        employeeBody,
        {
          responseType: 'text',
        }
      )
      .pipe(
        map((result) => {
          return result;
        })
      );
  }

  updateEmployeeLists(employees: Employee[]) {
    let activeEmployees = employees.filter(x => x.Archived == false);
    let archivedEmployees = employees.filter(x => x.Archived == true);

    this.activeEmployeesSig.set(activeEmployees);
    this.archivedEmployeesSig.set(archivedEmployees);
  }
}
