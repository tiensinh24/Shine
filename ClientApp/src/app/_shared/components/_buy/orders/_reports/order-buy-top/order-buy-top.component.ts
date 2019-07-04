import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { OrderValue } from 'src/app/order/_interfaces/order-value';
import { OrderBuyService } from 'src/app/order/buy/_services/order-buy.service';

@Component({
  selector: 'app-order-buy-top',
  templateUrl: './order-buy-top.component.html',
  styleUrls: ['./order-buy-top.component.scss']
})
export class OrderBuyTopComponent implements OnInit, OnDestroy {
  // Subscriptions
  topOrders$: Subscription;

  // Variables
  currentYear = moment().year();
  currentMonth = moment().month() + 1;
  topOrders: OrderValue[];
  topsMonth: OrderValue[] = [];
  topsQuarter: OrderValue[] = [];
  topsYear: OrderValue[] = [];

  // Boolean
  orderMode = 'm';

  constructor(private orderService: OrderBuyService) {}

  ngOnInit() {
    this.initialize();
  }

  ngOnDestroy() {
    this.topOrders$.unsubscribe();
  }

  initialize() {
    this.getTopOrders(3, this.currentYear, this.currentMonth, 'm');
  }

  getTopOrders(numRow: number, year: number, month: number, type: string) {
    this.topOrders$ = this.orderService.getTopOrderValue(numRow, year, month, type).subscribe((res: OrderValue[]) => {
      if (type === 'm') {
        this.topOrders = this.topsMonth = res;
      }

      if (type === 'q') {
        this.topOrders = this.topsQuarter = res;
      }

      if (type === 'y') {
        this.topOrders = this.topsYear = res;
      }
    });
  }

  setTopOrderMode(event: MatButtonToggleChange) {
    this.orderMode = event.value;

    switch (this.orderMode) {
      case 'y':
        if (this.topsYear.length === 0) {
          this.getTopOrders(3, this.currentYear, this.currentMonth, this.orderMode);
        } else {
          this.topOrders = this.topsYear;
        }
        break;

      case 'q':
        if (this.topsQuarter.length === 0) {
          this.getTopOrders(3, this.currentYear, this.currentMonth, this.orderMode);
        } else {
          this.topOrders = this.topsQuarter;
        }
        break;

      default:
        if (this.topsMonth.length === 0) {
          this.getTopOrders(3, this.currentYear, this.currentMonth, this.orderMode);
        } else {
          this.topOrders = this.topsMonth;
        }
        break;
    }
  }
}
