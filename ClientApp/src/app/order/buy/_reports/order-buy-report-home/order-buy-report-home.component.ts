import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { OrderBuyService } from '../../_services/order-buy.service';
import { Subscription } from 'rxjs';

import * as moment from 'moment';
import { OrderAndCostPerMonth } from '../../_interfaces/_reports/order-and-cost-per-month';
import { NavMenuComponent } from 'src/app/nav-menu/nav-menu.component';
import { OrderBuyLatest } from '../../_interfaces/_reports/order-buy-latest';

@Component({
  selector: 'app-order-buy-report-home',
  templateUrl: './order-buy-report-home.component.html',
  styleUrls: ['./order-buy-report-home.component.scss']
})
export class OrderBuyReportHomeComponent implements OnInit, OnDestroy {
  constructor(private orderService: OrderBuyService) {}
  // Subscription
  ordersValue$: Subscription;
  ordersCost$: Subscription;
  ordersCount$: Subscription;
  chartMonthData$: Subscription;
  latestOrder$: Subscription;
  totalDebt$: Subscription;

  ordersValue: number;
  ordersCost: number;
  ordersCount: number;
  chartMonthData: OrderAndCostPerMonth[];
  latestOrder: OrderBuyLatest;
  totalDebt: number;

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
    this.chartMonthData$.unsubscribe();
    this.latestOrder$.unsubscribe();
    this.totalDebt$.unsubscribe();
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

    this.latestOrder$ = this.orderService.getLatestOrder().subscribe((res: OrderBuyLatest) => {
      this.latestOrder = res;
    });

    this.totalDebt$ = this.orderService.getTotalOrderDebt().subscribe((res: number) => {
      this.totalDebt = res;
    });
  }

  setChartMode() {
    this.chartMode = !this.chartMode;
  }
}
