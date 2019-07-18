import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderBuyService } from 'src/app/_shared/services/buy/order-buy.service';
import { Subscription } from 'rxjs';
import { OrderBuyDetail } from 'src/app/_shared/intefaces/buy/order/order-buy-detail';
import { ActivatedRoute } from '@angular/router';
import { ProductOrder } from 'src/app/_shared/intefaces/buy/order/product-order';
import { OrderBuyProducts } from 'src/app/_shared/intefaces/buy/order/order-buy-products';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-order-buy-edit',
  templateUrl: './order-buy-edit.component.html',
  styleUrls: ['./order-buy-edit.component.scss']
})
export class OrderBuyEditComponent implements OnInit, OnDestroy {
  // Subsctiptions
  sub$ = new Subscription();

  // Variables
  order: OrderBuyDetail;

  orderId = +this.route.snapshot.params.orderId;
  title = '';

  constructor(private orderService: OrderBuyService, private route: ActivatedRoute, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.initialize();
  }

  ngOnDestroy() {
    this.sub$.unsubscribe();
  }

  initialize() {
    this.sub$.add(
      this.orderService.getOrderDetail(this.orderId).subscribe((res: OrderBuyDetail) => {
        this.order = res;

        this.title = `Edit order ${res.orderNumber}`;
      })
    );
  }

  // *Products
  addLineItem(lineItem: ProductOrder) {
    this.sub$.add(
      this.orderService.addOrderProduct(lineItem).subscribe((res: OrderBuyProducts) => {
        // If success, refresh order without call API
        if (res) {
          // Add new product
          this.order.products.push(res);
          this.order.products.sort((a, b) => (a.productName > b.productName ? 1 : -1));

          // Update order value
          this.updateOrderValue();

          this.snackBar.open('Line item has been added', 'Success');
        } else {
          this.snackBar.open(`Can't add line item, please try again`, 'Error');
        }
      })
    );
  }

  updateLineItem(lineItem: ProductOrder) {
    this.sub$.add(
      this.orderService.updateOrderProduct(lineItem).subscribe((res: OrderBuyProducts) => {
        if (res) {
          // Remove & add new updated line item
          const index = this.order.products.findIndex(p => p.productId === lineItem.productId);
          this.order.products.splice(index, 1, res);

          // Update order value
          this.updateOrderValue();

          this.snackBar.open('Line item has been updated', 'Success');
        } else {
          this.snackBar.open('Update failed, please try again', 'Error');
        }
      })
    );
  }

  deleteLineItem(lineItem: ProductOrder) {
    this.sub$.add(
      this.orderService.deleteOrderProduct(lineItem.orderId, lineItem.productId).subscribe((res: boolean) => {
        if (res) {
          // Remove line item
          const index = this.order.products.findIndex(p => p.productId === lineItem.productId);
          this.order.products.splice(index, 1);

          // Update order value
          this.updateOrderValue();

          this.snackBar.open('Line item deleted', 'Success');
        } else {
          this.snackBar.open(`Can't delete line item, please try again`, 'Success');
        }
      })
    );
  }

  private updateOrderValue() {
    this.order.orderTotal = this.order.products.reduce((a, b) => a + b.total, 0);
  }

  // *Payments

  // *Costs
}
