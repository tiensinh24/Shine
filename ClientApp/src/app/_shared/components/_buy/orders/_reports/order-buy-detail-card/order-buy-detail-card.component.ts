import {
  Component,
  Input,
  OnDestroy,
  OnInit
  } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Cost } from 'src/app/_shared/intefaces/public/cost';
import { Payment } from 'src/app/_shared/intefaces/public/payment';
import { OrderBuyDetail } from 'src/app/_shared/intefaces/buy/order/order-buy-detail';
import { OrderBuyProducts } from 'src/app/_shared/intefaces/buy/order/order-buy-products';
import { OrderBuyService } from 'src/app/_shared/services/buy/order-buy.service';

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

  // Google pie chart
  pieChartData = [[]];
  columnNames = ['Value', 'Cost'];
  options = {
    width: 300,
    height: 300,
    pieHole: 0.4,
    legend: { position: 'top', maxLines: 3 }
  };

  // boolean
  valueExpand = true;
  paymentExpand = false;
  costExpand = false;

  // Line items table
  valueDisplayedcolumns = ['productName', 'quantity', 'unit', 'price', 'tax'];
  valueDataSource = new MatTableDataSource<OrderBuyProducts>([]);

  // Payment table
  paymentDisplayedColumns = ['paymentDate', 'amount'];
  paymentDataSource = new MatTableDataSource<Payment>([]);

  // Cost table
  costDisplayedColumns = ['description', 'amount'];
  costDataSource = new MatTableDataSource<Cost>([]);

  // Input
  @Input() orderId: number;

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
      this.valueDataSource = new MatTableDataSource<OrderBuyProducts>(res.products);
      this.paymentDataSource = new MatTableDataSource<Payment>(res.payments);
      this.costDataSource = new MatTableDataSource<Cost>(res.costs);

      this.pieChartData.shift();
      this.pieChartData.push(['Value', res.orderTotal], ['Cost', res.totalCost]);
    });
  }

  // *Toggle expansion group
  toggleValueExpansion() {
    this.valueExpand = !this.valueExpand;
  }

  togglePaymentExpansion() {
    this.paymentExpand = !this.paymentExpand;
  }

  toggleCostExpansion() {
    this.costExpand = !this.costExpand;
  }
}
