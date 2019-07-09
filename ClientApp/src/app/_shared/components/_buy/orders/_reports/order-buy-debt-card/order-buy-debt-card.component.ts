import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderBuyService } from 'src/app/_shared/services/buy/order-buy.service';

import { SupplierService } from 'src/app/_shared/services/buy/supplier.service';
import { SupplierDebt } from 'src/app/_shared/intefaces/buy/supplier/report/supplier-debt';

@Component({
  selector: 'app-order-buy-debt-card',
  templateUrl: './order-buy-debt-card.component.html',
  styleUrls: ['./order-buy-debt-card.component.scss']
})
export class OrderBuyDebtCardComponent implements OnInit, OnDestroy {
  // Subscriptions
  totalDebt$: Subscription;
  topSupplierDebt$: Subscription;

  // Variables
  totalDebt: number;
  topSupplierDebt: SupplierDebt[];

  // Output
  @Output() showMoreDebt = new EventEmitter<boolean>();

  @Input() moreDebt = false;

  constructor(private orderService: OrderBuyService, private supplierService: SupplierService) {}

  ngOnInit() {
    this.getTotalDebt();
    this.getTopSupplierDebt(3);
  }

  ngOnDestroy() {
    this.totalDebt$.unsubscribe();
    this.topSupplierDebt$.unsubscribe();
  }

  getTotalDebt() {
    this.totalDebt$ = this.orderService.getTotalOrderDebt().subscribe((res: number) => {
      this.totalDebt = res;
    });
  }

  getTopSupplierDebt(numRows: number) {
    this.topSupplierDebt$ = this.supplierService.getTopSupplierDebt(numRows).subscribe((res: SupplierDebt[]) => {
      this.topSupplierDebt = res;
    });
  }

  // Output

  outShowMoreDebt() {
    this.showMoreDebt.emit(!this.moreDebt);
  }
}
