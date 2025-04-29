import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Login } from '../shared/classes/login';
import { Employee } from '../shared/classes/employee';
import { User } from '../shared/classes/user';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  loggedUserSig = signal<User | undefined>(undefined);

  private apiUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) {}

  loginUser(userName: string, password: string): Observable<any> {
    let body = { Username: userName, Password: password };

    return this.http
      .post(`${this.apiUrl}api/userLogins/login`, body, {
        responseType: 'text',
      })
      .pipe(
        map((result) => {
          return result;
        })
      );
  }

  addUserLogin(login: Login): Observable<any> {
    let body = {
      EmpId: login.EmpId,
      Username: login.Username,
      Password: login.Password,
      AccessLevel: login.AccessLevel,
      ITAccess: login.ITAccess,
    };

    return this.http
      .post(`${this.apiUrl}api/userLogins/addUserLogin`, body, {
        responseType: 'text',
      })
      .pipe(
        map((result) => {
          return result;
        })
      );
  }

  getUserProfile(id: number): Observable<any> {
    return this.http
      .get(`${this.apiUrl}api/employeeProfiles/getEmployeeProfile/${id}`)
      .pipe(
        map((result) => {
          console.log('User Profile: ', result)
          return result;
        })
      );
  }

  setLoggedInUser(): void {
    let loggedUser = new User();
    loggedUser = {
      AccessLevel: Number(localStorage.getItem('UserAccessLevel')), 
      ITAccess: localStorage.getItem('UserDept') == 'IT' ? true : false, 
      FullName: localStorage.getItem('UserFullName'),
      HRAccess: localStorage.getItem('UserDept') == 'HR' ? true : false
    };
    this.loggedUserSig.set(loggedUser);
    console.log(this.loggedUserSig());
  }
}
