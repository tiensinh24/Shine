import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderBuyService } from '../../_services/order-buy.service';
import { Subscription } from 'rxjs';

import * as moment from 'moment';
import { OrderAndCostPerMonth } from '../../_interfaces/_reports/order-and-cost-per-month';

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
  chartMonthData: OrderAndCostPerMonth[];
  chartMonthData$: Subscription;

  // true: month & false: quarter
  chartMode = true;

  // Current year & month
  currentYear = moment().year();
  currentMonth = moment().month() + 1;

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

    this.chartMonthData$ = this.orderService.getOrderAndCostPerMonth(this.currentYear).subscribe(res => {
      this.chartMonthData = res;
    });

    
  }
}
