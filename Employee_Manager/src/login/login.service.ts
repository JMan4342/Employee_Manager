import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Login } from '../shared/classes/login';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
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
}
