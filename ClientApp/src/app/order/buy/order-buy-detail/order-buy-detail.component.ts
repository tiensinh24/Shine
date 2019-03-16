import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

import { OrderBuyDto } from '../_interfaces/order-buy-dto';
import { OrderBuyService } from '../_services/order-buy.service';
import { OrderBuyEditDialogComponent } from 'src/app/_shared/components/order-buy-edit-dialog/order-buy-edit-dialog.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-buy-detail',
  templateUrl: './order-buy-detail.component.html',
  styleUrls: ['./order-buy-detail.component.css']
})
export class OrderBuyDetailComponent implements AfterViewInit, OnDestroy {
  orderBuy: OrderBuyDto;

  orderBuySub = new Subscription();

  constructor(private orderService: OrderBuyService,
    private route: ActivatedRoute,
    private dialog: MatDialog) { }

  ngAfterViewInit(): void {
    const id = +this.route.snapshot.params.orderId;

    this.orderBuySub = this.orderService.getOrder(id).subscribe(res => {
      this.orderBuy = res;
    });
  }

  ngOnDestroy(): void {
    this.orderBuySub.unsubscribe();
  }

  // Open order-edit dialog
  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    // Width & height
    dialogConfig.maxWidth = '100vw';
    dialogConfig.maxHeight = '100vh';
    dialogConfig.minWidth = '100%';
    dialogConfig.height = '100%';

    // Send data to order edit dialog component
    if (this.orderBuy) {
      dialogConfig.data = {
        orderId: this.orderBuy.orderId,
        orderNumber: this.orderBuy.orderNumber,
        dateOfIssue: this.orderBuy.dateOfIssue,
        timeForPayment: this.orderBuy.timeForPayment,
        personId: this.orderBuy.personId
      };

      const dialogRef = this.dialog.open(
        OrderBuyEditDialogComponent,
        dialogConfig,
      );

      // Get data returned from order-edit dialog
      dialogRef.afterClosed().subscribe((res: OrderBuyDto) => {
        if (res) {
          this.orderBuy = res;
        }
      });
    }
  }

}
