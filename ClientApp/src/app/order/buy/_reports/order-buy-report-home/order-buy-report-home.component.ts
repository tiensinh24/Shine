import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderBuyService } from '../../_services/order-buy.service';
import { Subscription } from 'rxjs';

import * as moment from 'moment';

@Component({
  selector: 'app-order-buy-report-home',
  templateUrl: './order-buy-report-home.component.html',
  styleUrls: ['./order-buy-report-home.component.scss']
})
export class OrderBuyReportHomeComponent implements OnInit, OnDestroy {
  constructor(private orderService: OrderBuyService) {}
  // Subscription
  ordersValue: number;
  ordersValue$: Subscription;
  ordersCost: number;
  ordersCost$: Subscription;
  ordersCount: number;
  ordersCount$: Subscription;

  // Current year & month
  currentYear = moment().year();
  currentMonth = moment().month();  

  ngOnInit() {
    this.initialize();
  }

  ngOnDestroy() {
    this.ordersValue$.unsubscribe();
    this.ordersCost$.unsubscribe();
    this.ordersCount$.unsubscribe();
  }

  initialize() {
    this.ordersValue$ = this.orderService.getOrdersSum(this.currentYear, this.currentMonth).subscribe(res => {
      this.ordersValue = res;
    });

    this.ordersCost$ = this.orderService.getOrdersCostSum(this.currentYear, this.currentMonth).subscribe(res => {
      this.ordersCost = res;
    });

    this.ordersCount$ = this.orderService.getOrdersCount(this.currentYear, this.currentMonth).subscribe(res => {
      this.ordersCount = res;
    });
  }
}
