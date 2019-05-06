import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderBuyEditDialogComponent } from 'src/app/_shared/components/order-buy-edit-dialog/order-buy-edit-dialog.component';
import { OrderBuyDetail } from '../_interfaces/order-buy-detail';
import { OrderBuyService } from '../_services/order-buy.service';

@Component({
  selector: 'app-order-buy-detail',
  templateUrl: './order-buy-detail.component.html',
  styleUrls: ['./order-buy-detail.component.css']
})
export class OrderBuyDetailComponent implements OnInit, OnDestroy {
  orderBuy: OrderBuyDetail;

  orderBuySub = new Subscription();

  constructor(private orderService: OrderBuyService, private route: ActivatedRoute, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.initialOrder();
  }

  ngOnDestroy(): void {
    this.orderBuySub.unsubscribe();
  }

  initialOrder() {
    const orderId = +this.route.snapshot.params.orderId;

    this.orderBuySub = this.orderService.getOrderDetail(orderId).subscribe((order: OrderBuyDetail) => {
      this.orderBuy = order;
    });
  }

  // Open order-edit dialog
  openDialog() {
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
    if (this.orderBuy) {
      dialogConfig.data = {
        orderId: this.orderBuy.orderId,
        orderNumber: this.orderBuy.orderNumber,
        dateOfIssue: this.orderBuy.dateOfIssue,
        timeForPayment: this.orderBuy.timeForPayment,
        personId: this.orderBuy.personId
      };

      const dialogRef = this.dialog.open(OrderBuyEditDialogComponent, dialogConfig);

      // Get data returned from order-edit dialog
      dialogRef.afterClosed().subscribe((res: OrderBuyDetail) => {
        if (res) {
          this.orderBuy = res;
        }
      });
    }
  }
}
