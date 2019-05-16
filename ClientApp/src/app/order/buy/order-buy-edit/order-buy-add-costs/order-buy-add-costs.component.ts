import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Cost } from 'src/app/order/_interfaces/cost';

@Component({
  selector: 'app-order-buy-add-costs',
  templateUrl: './order-buy-add-costs.component.html',
  styleUrls: ['./order-buy-add-costs.component.scss']
})
export class OrderBuyAddCostsComponent implements OnInit {
  @Output() costs = new EventEmitter<Cost[]>();

  constructor() {}

  ngOnInit() {}
}
