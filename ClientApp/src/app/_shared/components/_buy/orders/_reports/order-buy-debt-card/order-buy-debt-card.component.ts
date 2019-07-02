import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
  } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderBuyService } from 'src/app/order/buy/_services/order-buy.service';
import { SupplierDebt } from 'src/app/supplier/_interfaces/reports/supplier-debt';
import { SupplierService } from 'src/app/supplier/_services/supplier.service';

@Component({
  selector: 'app-order-buy-debt-card',
  templateUrl: './order-buy-debt-card.component.html',
  styleUrls: ['./order-buy-debt-card.component.scss']
})
export class OrderBuyDebtCardComponent implements OnInit,  OnDestroy {
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
    // this.moreDebt = !this.moreDebt;
  }
}
