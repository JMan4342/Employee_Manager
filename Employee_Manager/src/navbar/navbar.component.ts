import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { Menu } from 'primeng/menu';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Menubar, Menu, AvatarModule, ButtonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  navbarItems: MenuItem[] | undefined;
  avatarMenuItems: MenuItem[] | undefined;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.navbarItems = [
      {
        label: 'Home',
        // route: '/home'
        command: () => {
          this.router.navigate(['/home']);
        }
      },
      {
        label: 'Employees',
        // route: '/employees'
        command: () => {
          this.router.navigate(['/employees']);
        }
      }
    ];
    this.avatarMenuItems = [
      {
        label: 'Logout',
        icon: 'fa-solid fa-arrow-right-from-bracket',
        command: () => {
          localStorage.removeItem('Employee Token');
          this.router.navigate(['/login']);
        }
      }
    ]
  }
}
