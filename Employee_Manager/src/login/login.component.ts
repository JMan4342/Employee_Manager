import { Component, OnInit, afterRender } from '@angular/core';
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
    InputTextModule,
    PasswordModule,
    FormsModule,
    FloatLabelModule,
    ButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  userName: string = '';
  password: string = '';

  constructor(private loginService: LoginService, private router: Router) {
    afterRender(() => {
      localStorage.removeItem('Employee Token');
    });
  }

  ngOnInit() {
    // this.resetLocalStorage();
  }

  resetLocalStorage() {
    // localStorage.removeItem('Employee Token');
  }

  login(): void {
    this.loginService.loginUser(this.userName, this.password).subscribe({
      next: (results) => {
        console.log(results);
      },
      error: (err) => console.log(err),
    });
  }

  getAuth() {
    localStorage.setItem('Employee Token', '1');
    this.router.navigate(['/home']);
  }
}
