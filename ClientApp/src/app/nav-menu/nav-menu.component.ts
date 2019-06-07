import { AfterContentChecked, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IconService } from '../_shared/_services/icon.service';
import { AuthService } from '../auth/_services/auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit, AfterContentChecked {
  user: string;
  sidenavToggle = true;

  @Input() loading: boolean;

  constructor(private auth: AuthService, private router: Router, private iconService: IconService) {
    // Get svgIcon from IconService
    this.iconService.logo();
  }

  ngOnInit(): void {
    if (localStorage.length > 0) {
      this.user = this.auth.getLocalAuth().userName;
    }
  }

  ngAfterContentChecked(): void {
    if (localStorage.length > 0) {
      if (this.user !== this.auth.getLocalAuth().userName) {
        this.user = this.auth.getLocalAuth().userName;
      }
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
