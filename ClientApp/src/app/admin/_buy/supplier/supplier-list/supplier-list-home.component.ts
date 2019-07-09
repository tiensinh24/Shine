import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-supplier-list-home',
  templateUrl: './supplier-list-home.component.html',
  styleUrls: ['./supplier-list-home.component.scss']
})
export class SupplierListHomeComponent implements OnInit {
  displayMode = true;

  constructor() {}

  ngOnInit() {}

  toggleDisplay() {
    this.displayMode = !this.displayMode;
  }
}
