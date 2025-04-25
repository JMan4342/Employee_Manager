import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthorizationService {
  isAuthorized: boolean = false;

  constructor() { }

  verifyAuthorization(): boolean {
    let authorized = false;
    if (localStorage.getItem('Employee Token') && localStorage.getItem('Employee Token') != null && localStorage.getItem('Employee Token') != undefined) {
      authorized = true;
    };
    
    return authorized;
  }
}
