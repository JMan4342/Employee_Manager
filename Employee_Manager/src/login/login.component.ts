import { Component, OnInit, afterRender } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    PasswordModule,
    FormsModule,
    FloatLabelModule,
    ButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  loginMessage: string = '';

  constructor(private loginService: LoginService, private router: Router) {
    afterRender(() => {
      localStorage.removeItem('Employee Token');
    });
  }

  ngOnInit() {
    this.loginMessage = '';
  }

  resetLocalStorage() {
    // localStorage.removeItem('Employee Token');
  }

  login(): void {
    this.loginMessage = '';

    this.loginService.loginUser(this.username, this.password).subscribe({
      next: (results) => {
        console.log(results);
          this.getAuth(results);
      },
      error: (err) => {
        console.log(err);
        this.loginMessage = err.error;
        console.log(this.loginMessage);
      },
    });
  }

  getAuth(token: string) {
    localStorage.setItem('Employee Token', token);
    this.router.navigate(['/home']);
  }
}
