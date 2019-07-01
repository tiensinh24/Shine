import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderBuyLatest } from 'src/app/order/buy/_interfaces/_reports/order-buy-latest';
import { OrderBuyService } from 'src/app/order/buy/_services/order-buy.service';

@Component({
  selector: 'app-order-buy-latest',
  templateUrl: './order-buy-latest.component.html',
  styleUrls: ['./order-buy-latest.component.scss']
})
export class OrderBuyLatestComponent implements OnInit, OnDestroy {
  // Subscriptions
  latestOrder$: Subscription;

  // Variables
  latestOrder: OrderBuyLatest;

  constructor(private orderService: OrderBuyService) {}

  ngOnInit() {
    this.getLatestOrder();
  }

  ngOnDestroy() {
    this.latestOrder$.unsubscribe();
  }

  getLatestOrder() {
    this.latestOrder$ = this.orderService.getLatestOrder().subscribe((res: OrderBuyLatest) => {
      this.latestOrder = res;
    });
  }
}
