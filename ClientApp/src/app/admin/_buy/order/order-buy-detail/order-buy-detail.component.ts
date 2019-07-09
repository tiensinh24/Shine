import { OrderBuy } from '../../../../_shared/intefaces/buy/order/order-buy';
import { OrderBuyDetail } from '../../../../_shared/intefaces/buy/order/order-buy-detail';
import { OrderBuyProducts } from '../../../../_shared/intefaces/buy/order/order-buy-products';
import { OrderBuyService } from '../../../../_shared/services/buy/order-buy.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PaymentService } from 'src/app/_shared/services/public/payment.service';
import { ConfirmDialogService } from 'src/app/_shared/services/public/confirm-dialog.service';
import { OrderBuyEditDialogComponent } from 'src/app/_shared/components/_buy/orders/order-buy-edit-dialog/order-buy-edit-dialog.component';
import { Payment } from 'src/app/_shared/intefaces/public/payment';
import { PaymentEditDialogComponent } from 'src/app/_shared/components/payment-edit-dialog/payment-edit-dialog.component';
import { OrderProductsEditDialogComponent } from 'src/app/_shared/components/order-products-edit-dialog/order-products-edit-dialog.component';

@Component({
  selector: 'app-order-buy-detail',
  templateUrl: './order-buy-detail.component.html',
  styleUrls: ['./order-buy-detail.component.css']
})
export class OrderBuyDetailComponent implements OnInit, OnDestroy {
  order = <OrderBuyDetail>{};
  isPayment = false;

  // Products table
  displayedcolumn = ['productName', 'quantity', 'price', 'tax', 'rate', 'unit', 'total', 'actions'];
  dataSource = new MatTableDataSource<OrderBuyProducts>([]);

  orderSub: Subscription;

  constructor(
    private orderService: OrderBuyService,
    private paymentService: PaymentService,
    private confirmService: ConfirmDialogService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

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
      this.dataSource = new MatTableDataSource<OrderBuyProducts>(order.products);
    });
  }

  // Open order-edit dialog
  openOrderDialog() {
    const dialogConfig = <MatDialogConfig>{
      disableClose: true,
      autoFocus: false,
      maxWidth: '100vw',
      maxHeight: '100vh',
      width: '800px',
      height: '675px',
      panelClass: 'custom-dialog'
    };

    // Send data to order edit dialog component
    if (this.order) {
      dialogConfig.data = {
        orderId: this.order.orderId,
        orderNumber: this.order.orderNumber,
        dateOfIssue: this.order.dateOfIssue,
        timeForPayment: this.order.timeForPayment,
        personId: this.order.personId,
        employeeId: this.order.employeeId,
        employeeName: this.order.employeeName,
        rating: this.order.rating
      };

      const dialogRef = this.dialog.open(OrderBuyEditDialogComponent, dialogConfig);

      // Get data returned from order-edit dialog
      dialogRef.afterClosed().subscribe((res: OrderBuy) => {
        if (res) {
          this.initialOrder();
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
      if (res) {
        this.initialOrder();
      }
    });
  }

  openOrderProductDialog(product?: OrderBuyProducts) {
    const dialogConfig = <MatDialogConfig>{
      disableClose: true,
      autoFocus: true,
      maxWidth: '100vw',
      maxHeight: '100vh',
      minWidth: '800px',
      minHeight: '565px',
      panelClass: 'custom-dialog'
    };

    if (product !== null) {
      dialogConfig.data = {
        orderId: product.orderId,
        supplierId: this.order.personId,
        productId: product.productId,
        productName: product.productName,
        quantity: product.quantity,
        price: product.price,
        tax: product.tax,
        rate: product.rate,
        unit: product.unit,
        edit: true
      };
    } else {
      dialogConfig.data = {
        orderId: this.order.orderId,
        supplierId: this.order.personId,
        edit: false
      };
    }

    const dialogRef = this.dialog.open(OrderProductsEditDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.initialOrder();
      }
    });
  }

  deletePayment(payment: Payment) {
    const dialogRef = this.confirmService.openDialog(`Do you want to delete this payment?`);

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.paymentService.deletePayment(payment.paymentId).subscribe(() => {
          this.initialOrder();
        });
        this.snackBar.open('Payment deleted', 'Success');
      }
    });
  }

  togglePayment() {
    this.isPayment = !this.isPayment;
  }

  // * Products

  deleteOrderProduct(productOrder: OrderBuyProducts) {
    const dialogRef = this.confirmService.openDialog(`Are you sure to delete ${productOrder.productName}?`);

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.orderService.deleteOrderProduct(this.order.orderId, productOrder.productId).subscribe(() => {
          this.initialOrder();
          this.snackBar.open(`${productOrder.productName} deleted`, 'Success');
        });
      }
    });
  }
}
