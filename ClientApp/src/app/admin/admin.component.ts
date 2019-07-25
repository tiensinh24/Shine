import { Component, OnInit, Input, ViewChild, AfterContentChecked } from '@angular/core';
import { AuthService } from '../auth/_services/auth.service';
import { Router } from '@angular/router';
import { IconService } from '../_shared/services/public/icon.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, AfterContentChecked {
  user: string;
  sidenavMode = true;

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
