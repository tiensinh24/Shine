import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderBuyEditDialogComponent } from 'src/app/_shared/components/order-buy-edit-dialog/order-buy-edit-dialog.component';
import { PaymentEditDialogComponent } from 'src/app/_shared/components/payment-edit-dialog/payment-edit-dialog.component';
import { Payment } from 'src/app/payment/_interfaces/payment';
import { OrderBuyDetail } from '../_interfaces/order-buy-detail';
import { OrderBuyProducts } from '../_interfaces/order-buy-products';
import { OrderBuyService } from '../_services/order-buy.service';

@Component({
  selector: 'app-order-buy-detail',
  templateUrl: './order-buy-detail.component.html',
  styleUrls: ['./order-buy-detail.component.css']
})
export class OrderBuyDetailComponent implements OnInit, OnDestroy {
  order = <OrderBuyDetail>{};
  isPayment = false;

  orderSub = new Subscription();

  constructor(private orderService: OrderBuyService, private route: ActivatedRoute, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.initialOrder();
  }

  ngOnDestroy(): void {
    this.orderSub.unsubscribe();
  }

  initialOrder() {
    const orderId = +this.route.snapshot.params.orderId;

    this.orderSub = this.orderService.getOrderDetail(orderId).subscribe((order: OrderBuyDetail) => {
      this.order = order;
    });
  }

  // Open order-edit dialog
  openOrderDialog() {
    const dialogConfig = <MatDialogConfig>{
      disableClose: true,
      autoFocus: true,
      maxWidth: '100vw',
      maxHeight: '100vh',
      width: '800px',
      height: '550px',
      panelClass: 'custom-dialog'
    };

    // Send data to order edit dialog component
    if (this.order) {
      dialogConfig.data = {
        orderId: this.order.orderId,
        orderNumber: this.order.orderNumber,
        dateOfIssue: this.order.dateOfIssue,
        timeForPayment: this.order.timeForPayment,
        personId: this.order.personId
      };

      const dialogRef = this.dialog.open(OrderBuyEditDialogComponent, dialogConfig);

      // Get data returned from order-edit dialog
      dialogRef.afterClosed().subscribe((res: OrderBuyDetail) => {
        if (res) {
          this.order = res;
        }
      });
    }
  }

  openPaymentDialog(payment?: Payment) {
    const dialogConfig = <MatDialogConfig>{
      disableClose: true,
      autoFocus: true,
      maxWidth: '100vw',
      maxHeight: '100vh',
      width: '800px',
      height: '565px',
      panelClass: 'custom-dialog'
    };

    if (payment !== null) {
      dialogConfig.data = {
        paymentId: payment.paymentId,
        orderId: payment.orderId,
        paymentDate: payment.paymentDate,
        amount: payment.amount,
        currency: payment.currency,
        rate: payment.rate
      };
    } else {
      dialogConfig.data = {
        orderId: this.order.orderId
      };
    }

    const dialogRef = this.dialog.open(PaymentEditDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(res => {
      // TODO do something
    });
  }

  togglePayment() {
    this.isPayment = !this.isPayment;
  }
}
