import { Component, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Subscription } from 'rxjs';

import { OrderAndCostPerMonth } from 'src/app/_shared/intefaces/public/order/order-and-cost-per-month';
import { OrderAndCostPerQuarter } from 'src/app/_shared/intefaces/public/order/order-and-cost-per-quarter';
import { OrderBuyService } from 'src/app/_shared/services/buy/order-buy.service';

@Component({
  selector: 'app-order-buy-report-home',
  templateUrl: './order-buy-report-home.component.html',
  styleUrls: ['./order-buy-report-home.component.scss']
})
export class OrderBuyReportHomeComponent implements OnInit, OnDestroy {
  // Subscription
  ordersValue$: Subscription;
  ordersCost$: Subscription;
  ordersCount$: Subscription;
  chartMonthData$: Subscription;
  chartQuarterData$: Subscription;

  ordersValue: number;
  ordersCost: number;
  ordersCount: number;
  chartMonthData: OrderAndCostPerMonth[];
  chartQuarterData: OrderAndCostPerQuarter[];

  // true: month & false: quarter
  chartMode = true;

  // Receive from output
  showMoreDebt: boolean;
  showOrderDetail: boolean;
  showOrderList: boolean;
  orderId: number;

  // Current year & month
  currentYear = moment().year();
  currentMonth = moment().month() + 1;

  constructor(private orderService: OrderBuyService) {}

  ngOnInit() {
    this.initialize();
  }

  ngOnDestroy() {
    this.ordersValue$.unsubscribe();
    this.ordersCost$.unsubscribe();
    this.ordersCount$.unsubscribe();
    this.chartMonthData$.unsubscribe();
    this.chartQuarterData$.unsubscribe();
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

    this.chartQuarterData$ = this.orderService.getOrderAndCostPerQuarter(this.currentYear).subscribe((res: OrderAndCostPerQuarter[]) => {
      this.chartQuarterData = res;
    });
  }

  toggleChartMode() {
    this.chartMode = !this.chartMode;
  }

  // *Get from output

  getOutShowMoreDebt(event: boolean) {
    this.showMoreDebt = event;

    this.showOrderDetail = false;
    this.showOrderList = false;
  }

  getOutShowOrderDetail(event: boolean) {
    this.showOrderDetail = event;

    this.showMoreDebt = false;
    this.showOrderList = false;
  }

  getOutShowOrderList(event: boolean) {
    this.showOrderList = event;

    this.showMoreDebt = false;
    this.showOrderDetail = false;
  }

  getOutOrderId(event: number) {
    this.orderId = event;
  }
}
