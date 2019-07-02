import { OrderAndCostPerMonth } from '../../_interfaces/_reports/order-and-cost-per-month';
import { OrderBuyLatest } from '../../_interfaces/_reports/order-buy-latest';
import { OrderBuyService } from '../../_services/order-buy.service';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit
  } from '@angular/core';
import * as moment from 'moment';
import { Subscription } from 'rxjs';

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

  ordersValue: number;
  ordersCost: number;
  ordersCount: number;
  chartMonthData: OrderAndCostPerMonth[];

  // true: month & false: quarter
  chartMode = true;

  // Receive from output
  showMoreDebt: boolean;
  showOrderDetail: boolean;
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

  setChartMode() {
    this.chartMode = !this.chartMode;
  }

  // *Get from output

  getOutShowMoreDebt(event: boolean) {
    this.showMoreDebt = event;

    if (this.showMoreDebt) {
      this.showOrderDetail = false;
    }
  }

  getOutShowOrderDetail(event: boolean) {
    this.showOrderDetail = event;

    if (this.showOrderDetail) {
      this.showMoreDebt = false;
    }
  }

  getOutOrderId(event: number) {
    this.orderId = event;
  }
}
