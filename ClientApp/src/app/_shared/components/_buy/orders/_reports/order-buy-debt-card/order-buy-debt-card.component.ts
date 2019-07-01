import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderBuyService } from 'src/app/order/buy/_services/order-buy.service';

@Component({
  selector: 'app-order-buy-debt-card',
  templateUrl: './order-buy-debt-card.component.html',
  styleUrls: ['./order-buy-debt-card.component.scss']
})
export class OrderBuyDebtCardComponent implements OnInit, OnDestroy {
  // Subscriptions
  totalDebt$: Subscription;

  // Variables
  totalDebt: number;

  constructor(private orderService: OrderBuyService) {}

  ngOnInit() {
    this.getTotalDebt();
  }

  ngOnDestroy() {
    this.totalDebt$.unsubscribe();
  }

  getTotalDebt() {
    this.totalDebt$ = this.orderService.getTotalOrderDebt().subscribe((res: number) => {
      this.totalDebt = res;
    });
  }
}
