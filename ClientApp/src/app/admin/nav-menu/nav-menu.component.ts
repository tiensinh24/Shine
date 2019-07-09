import { AfterContentChecked, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from 'src/app/auth/_services/auth.service';
import { IconService } from 'src/app/_shared/services/public/icon.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit, AfterContentChecked {
  user: string;
  sidenavMode = true;

  @Input() loading: boolean;

  @ViewChild('leftnav', { static: false }) leftnav: MatSidenav;

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

  toggleLeftNav() {
    this.leftnav.toggle();
  }

}
