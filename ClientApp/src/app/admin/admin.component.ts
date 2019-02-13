import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  navlinks = [
    { label: 'dashboard', path: '/admin' },
    { label: 'Manager User', path: '/admin/manager-user' },
    { label: 'Manager Role', path: '/admin/manager-role' },
  ];

  constructor() {}

  ngOnInit() {}
}
