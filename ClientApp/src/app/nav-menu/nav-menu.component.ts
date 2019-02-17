import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth/_services/auth.service';


@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'],
})
export class NavMenuComponent implements OnInit, AfterContentChecked {
  user: string;
  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('auth')).userName;
  }

  ngAfterContentChecked(): void {
    if (this.user !== localStorage.getItem("user")) {
      this.user = JSON.parse(localStorage.getItem('auth')).userName;
    }
  }

  logout() {
    this.user = null;
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  login() {
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return this.auth.isLoggedIn();
  }
}
