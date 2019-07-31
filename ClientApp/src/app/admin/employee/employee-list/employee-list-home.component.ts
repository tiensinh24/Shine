import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-list-home',
  templateUrl: './employee-list-home.component.html',
  styleUrls: ['./employee-list-home.component.scss']
})
export class EmployeeListHomeComponent implements OnInit {
  displayMode = true;

  constructor() {}

  ngOnInit() {}

  toggleDisplay($event: boolean) {
    this.displayMode = $event;
  }
}
