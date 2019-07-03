import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit
  } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { OrderBuyDetail } from 'src/app/order/buy/_interfaces/order-buy-detail';
import { OrderBuyProducts } from 'src/app/order/buy/_interfaces/order-buy-products';
import { OrderBuyService } from 'src/app/order/buy/_services/order-buy.service';

@Component({
  selector: 'app-order-buy-detail-card',
  templateUrl: './order-buy-detail-card.component.html',
  styleUrls: ['./order-buy-detail-card.component.scss']
})
export class OrderBuyDetailCardComponent implements OnInit, OnDestroy {
  // Subscriptions
  order$: Subscription;

  // Variables
  order: OrderBuyDetail;

  // Products table
  displayedcolumn = ['productName', 'quantity', 'unit', 'price', 'tax'];
  dataSource = new MatTableDataSource<OrderBuyProducts>([]);

  // Input
  @Input() orderId: number;

  // Output

  constructor(private orderService: OrderBuyService) {}

  ngOnInit() {
    this.getOrder(this.orderId);
  }

  ngOnDestroy() {
    this.order$.unsubscribe();
  }

  getOrder(orderId: number) {
    this.order$ = this.orderService.getOrderDetail(orderId).subscribe((res: OrderBuyDetail) => {
      this.order = res;
      this.dataSource = new MatTableDataSource<OrderBuyProducts>(res.products);
    });
  }
}
