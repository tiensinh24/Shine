import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { OrderBuyService } from 'src/app/_shared/services/buy/order-buy.service';
import { Subscription } from 'rxjs';
import { OrderBuyDetail } from 'src/app/_shared/intefaces/buy/order/order-buy-detail';
import { ActivatedRoute } from '@angular/router';
import { ProductOrder } from 'src/app/_shared/intefaces/buy/order/product-order';
import { OrderBuyProducts } from 'src/app/_shared/intefaces/buy/order/order-buy-products';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Payment } from 'src/app/_shared/intefaces/public/payment';
import { Cost } from 'src/app/_shared/intefaces/public/cost';
import { MatDialog, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { OrderBuyEditDialogComponent } from 'src/app/_shared/components/_buy/orders/order-buy-edit-dialog/order-buy-edit-dialog.component';
import { OrderBuyList } from 'src/app/_shared/intefaces/buy/order/order-buy-list';
import { OrderBuy } from 'src/app/_shared/intefaces/buy/order/order-buy';
import { EmployeeService } from 'src/app/_shared/services/public/employee.service';
import { EmployeeList } from 'src/app/_shared/intefaces/public/employee-list';

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

  // Table data source
  valueDataSource = new MatTableDataSource<OrderBuyProducts>();
  paymentDataSource = new MatTableDataSource<Payment>();
  costDataSource = new MatTableDataSource<Cost>();

  // Table columns
  valueColumns = ['productName', 'quantity', 'price', 'tax', 'rate', 'unit', 'actions'];
  paymentColumns = ['paymentDate', 'amount', 'currency', 'rate', 'actions'];
  costColumns = ['costDate', 'description', 'amount', 'currency', 'rate', 'actions'];

  orderId = +this.route.snapshot.params.orderId;
  title = '';

  // Google pie chart
  pieChartData = [[]];
  columnNames = ['Value', 'Cost'];
  options = {
    width: 300,
    height: 300,
    pieHole: 0.4,
    legend: { position: 'top', maxLines: 3 }
  };

  // Expansion boolean
  showValueExpansion = true;
  showPaymentExpansion = false;
  showCostExpansion = false;

  constructor(
    private orderService: OrderBuyService,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

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

        // Set childs data source
        this.valueDataSource = new MatTableDataSource(res.products);
        this.paymentDataSource = new MatTableDataSource(res.payments);
        this.costDataSource = new MatTableDataSource(res.costs);

        // Set data for pie chart
        this.pieChartData.shift();
        this.pieChartData.push(['Value', res.orderTotal], ['Cost', res.costTotal]);

        this.title = `Edit order ${res.orderNumber}`;
      })
    );
  }

  // *Order
  // Open order-buy-edit-dialog
  openOrderDialog() {
    const dialogConfig = <MatDialogConfig>{
      disableClose: true,
      autoFocus: false,
      maxWidth: '100vw',
      maxHeight: '100vh',
      width: '800px',
      height: '675px',
      panelClass: 'custom-dialog',
      data: {
        rating: this.order.rating,
        orderId: this.order.orderId,
        orderNumber: this.order.orderNumber,
        dateOfIssue: this.order.dateOfIssue,
        timeForPayment: this.order.timeForPayment,
        personId: this.order.personId,
        supplierName: this.order.supplier.fullName,
        employeeId: this.order.employeeId,
        employeeName: this.order.employee.fullName
      }
    };

    // Open dialog with config & passed data
    const dialogRef = this.dialog.open(OrderBuyEditDialogComponent, dialogConfig);

    // Pass data from dialog in to main component
    dialogRef.afterClosed().subscribe((data: OrderBuy) => {
      if (data) {
        this.updateOrder(data);
        this.snackBar.open(`Order ${data.orderNumber} updated`, 'Success');
      } else {
        this.snackBar.open(`Can't update order, please try again`, 'Error');
      }
    });
  }

  private updateOrder(order: OrderBuy) {
    this.order.orderNumber = order.orderNumber;
    this.order.dateOfIssue = order.dateOfIssue;
    this.order.timeForPayment = order.timeForPayment;
    this.order.rating = order.rating;
    this.order.personId = order.personId;

    if (this.order.employeeId !== order.employeeId) {
      this.order.employeeId = order.employeeId;

      this.updateEmployee(order.employeeId);
    }
  }

  private updateEmployee(employeeId: number) {
    this.sub$.add(
      this.employeeService.getEmployee(employeeId).subscribe((res: EmployeeList) => {
        if (res) {
          this.order.employee = res;
        }
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

  toggleValueExpansion() {
    this.showValueExpansion = !this.showValueExpansion;
  }

  // *Payments

  togglePaymentExpansion() {
    this.showPaymentExpansion = !this.showPaymentExpansion;
  }
  // *Costs

  toggleCostExpansion() {
    this.showCostExpansion = !this.showCostExpansion;
  }
}
