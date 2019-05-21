import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.css']
})
export class CustomerHomeComponent implements OnInit {
  rating = 3;

  constructor() {}

  ngOnInit() {}

  onClickChange($event: any) {
    this.rating = $event.rating;
  }
}
