import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { OrderBuyService } from 'src/app/_shared/services/buy/order-buy.service';
import { Subscription } from 'rxjs';
import { OrderBuyDetail } from 'src/app/_shared/intefaces/buy/order/order-buy-detail';
import { ActivatedRoute } from '@angular/router';
import { OrderBuyProducts } from 'src/app/_shared/intefaces/buy/order/order-buy-products';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Payment } from 'src/app/_shared/intefaces/public/payment';
import { Cost } from 'src/app/_shared/intefaces/public/cost';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OrderBuyEditDialogComponent } from 'src/app/_shared/components/_buy/orders/order-buy-edit-dialog/order-buy-edit-dialog.component';
import { OrderBuy } from 'src/app/_shared/intefaces/buy/order/order-buy';
import { EmployeeService } from 'src/app/_shared/services/public/employee.service';
import { EmployeeList } from 'src/app/_shared/intefaces/public/employee-list';
import { OrderProductsEditDialogComponent } from 'src/app/_shared/components/order-products-edit-dialog/order-products-edit-dialog.component';
import { CostEditDialogComponent } from 'src/app/_shared/components/cost-edit-dialog/cost-edit-dialog.component';
import { CostService } from 'src/app/_shared/services/public/cost.service';
import { PaymentService } from 'src/app/_shared/services/public/payment.service';
import { GoogleChartComponent } from 'angular-google-charts';
import { PaymentEditDialogComponent } from 'src/app/_shared/components/payment-edit-dialog/payment-edit-dialog.component';

@Component({
  selector: 'app-order-buy-edit',
  templateUrl: './order-buy-edit.component.html',
  styleUrls: ['./order-buy-edit.component.scss']
})
export class OrderBuyEditComponent implements OnInit, OnDestroy {
  // Subsctiptions
  sub$ = new Subscription();

  @ViewChild('chart', { static: false }) chart: GoogleChartComponent;

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
    private costService: CostService,
    private paymentService: PaymentService,
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
  updateOrder() {
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
    dialogRef.afterClosed().subscribe((data: any) => {
      // Cancel is a string return from dialog when cancel button press
      if (data !== 'cancel') {
        if (data) {
          this.refreshOrder(data);
          this.snackBar.open(`Order ${data.orderNumber} updated`, 'Success');
        } else {
          this.snackBar.open(`Can't update order, please try again`, 'Error');
        }
      }
    });
  }

  private refreshOrder(order: OrderBuy) {
    this.order.orderNumber = order.orderNumber;
    this.order.dateOfIssue = order.dateOfIssue;
    this.order.timeForPayment = order.timeForPayment;
    this.order.rating = order.rating;
    this.order.personId = order.personId;

    if (this.order.employeeId !== order.employeeId) {
      this.order.employeeId = order.employeeId;

      this.refreshEmployee(order.employeeId);
    }
  }

  private refreshEmployee(employeeId: number) {
    this.sub$.add(
      this.employeeService.getEmployee(employeeId).subscribe((res: EmployeeList) => {
        if (res) {
          this.order.employee = res;
        }
      })
    );
  }

  // *Products

  // No parameter mean add and other is for edit
  addEditLineItem(lineItem?: OrderBuyProducts) {
    const dialogConfig = <MatDialogConfig>{
      disableClose: true,
      autoFocus: true,
      maxWidth: '100vw',
      maxHeight: '100vh',
      width: '800px',
      height: '565px',
      panelClass: 'custom-dialog'
    };

    if (lineItem !== undefined) {
      dialogConfig.data = {
        orderId: lineItem.orderId,
        supplierId: this.order.personId,
        productId: lineItem.productId,
        productName: lineItem.productName,
        quantity: lineItem.quantity,
        price: lineItem.price,
        tax: lineItem.tax,
        rate: lineItem.rate,
        unit: lineItem.unit,
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
      // 'cancel' is a string return from dialog when cancel button is clicked
      if (res !== 'cancel') {
        if (res) {
          // Add new
          if (lineItem === undefined) {
            this.order.products.push(res);
            this.order.products.sort((a, b) => (a.productName > b.productName ? 1 : -1));

            this.snackBar.open('Line item has been added', 'Success');
          } else {
            // Remove & add new updated line item
            const index = this.order.products.findIndex(p => p.productId === res.productId);
            this.order.products.splice(index, 1, res);

            this.snackBar.open('Line item has been udpated', 'Success');
          }

          // Refresh mat-table data
          this.valueDataSource._updateChangeSubscription();

          // Refresh order value
          this.refreshOrderValue();
        } else {
          this.snackBar.open('An error has occurred, please try again', 'Error');
        }
      }
    });
  }

  deleteLineItem(lineItem: OrderBuyProducts) {
    this.sub$.add(
      this.orderService.deleteOrderProduct(lineItem.orderId, lineItem.productId).subscribe((res: boolean) => {
        if (res) {
          // Remove line item
          const index = this.order.products.findIndex(p => p.productId === lineItem.productId);
          this.order.products.splice(index, 1);

          // Refresh mat-table data
          this.valueDataSource._updateChangeSubscription();

          // Update order value
          this.refreshOrderValue();

          this.snackBar.open('Line item deleted', 'Success');
        } else {
          this.snackBar.open(`Can't delete line item, please try again`, 'Success');
        }
      })
    );
  }

  private refreshOrderValue() {
    this.order.orderTotal = this.order.products.reduce((a, b) => a + b.total, 0);
    this.refreshPieChart();
  }

  toggleValueExpansion() {
    this.showValueExpansion = !this.showValueExpansion;
  }

  // *Costs
  // No parameter mean add and other is for edit
  addEditCost(cost?: Cost) {
    const dialogConfig = <MatDialogConfig>{
      disableClose: true,
      autoFocus: true,
      maxWidth: '100vw',
      maxHeight: '100vh',
      width: '800px',
      height: '560px',
      panelClass: 'custom-dialog'
    };

    // Edit mode
    if (cost !== undefined) {
      dialogConfig.data = {
        costId: cost.costId,
        orderId: cost.orderId,
        orderNumber: this.order.orderNumber,
        costDate: cost.costDate,
        description: cost.description,
        amount: cost.amount,
        currency: cost.currency,
        rate: cost.rate,
        edit: true
      };
    } else {
      dialogConfig.data = {
        orderId: this.order.orderId,
        orderNumber: this.order.orderNumber,
        edit: false
      };
    }

    const dialogRef = this.dialog.open(CostEditDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(res => {
      // 'cancel' is a string return from dialog when cancel button is clicked
      if (res !== 'cancel') {
        if (res) {
          // Add new
          if (cost === undefined) {
            this.order.costs.push(res);
            this.order.costs.sort((a, b) => (a.costDate > b.costDate ? -1 : 1));

            this.snackBar.open('Cost has been added', 'Success');
          } else {
            // Remove & add new updated cost
            const index = this.order.costs.findIndex(c => c.costId === res.costId);
            this.order.costs.splice(index, 1, res);

            this.snackBar.open('Cost has been udpated', 'Success');
          }

          // Refresh mat-table data
          this.costDataSource._updateChangeSubscription();

          // Refresh order value
          this.refreshTotalCost();
        } else {
          this.snackBar.open('An error has occurred, please try again', 'Error');
        }
      }
    });
  }

  deleteCost(cost: Cost) {
    this.sub$.add(
      this.costService.deleteCost(cost.costId).subscribe((res: boolean) => {
        if (res) {
          // Remove cost
          const index = this.order.costs.findIndex(c => c.costId === cost.costId);
          this.order.costs.splice(index, 1);

          // Refresh mat-table data
          this.costDataSource._updateChangeSubscription();

          // Update total cost
          this.refreshTotalCost();

          this.snackBar.open('Cost deleted', 'Success');
        } else {
          this.snackBar.open(`Can't delete cost, please try again`, 'Error');
        }
      })
    );
  }

  private refreshTotalCost() {
    this.order.costTotal = this.order.costs.reduce((a, b) => a + b.amount, 0);
    this.refreshPieChart();
  }

  toggleCostExpansion() {
    this.showCostExpansion = !this.showCostExpansion;
  }

  // *Payments
  // No parameter mean add and other is for edit
  addEditPayment(payment?: Payment) {
    const dialogConfig = <MatDialogConfig>{
      disableClose: true,
      autoFocus: true,
      maxWidth: '100vw',
      maxHeight: '100vh',
      width: '800px',
      height: '560px',
      panelClass: 'custom-dialog'
    };

    // Edit mode
    if (payment !== undefined) {
      dialogConfig.data = {
        paymentId: payment.paymentId,
        orderId: payment.orderId,
        orderNumber: this.order.orderNumber,
        paymentDate: payment.paymentDate,
        amount: payment.amount,
        currency: payment.currency,
        rate: payment.rate,
        edit: true
      };
    } else {
      dialogConfig.data = {
        orderId: this.order.orderId,
        orderNumber: this.order.orderNumber,
        edit: false
      };
    }

    const dialogRef = this.dialog.open(PaymentEditDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(res => {
      // 'cancel' is a string return from dialog when cancel button is clicked
      if (res !== 'cancel') {
        if (res) {
          // Add new
          if (payment === undefined) {
            this.order.payments.push(res);
            this.order.payments.sort((a, b) => (a.paymentDate > b.paymentDate ? -1 : 1));

            this.snackBar.open('Payment has been added', 'Success');
          } else {
            // Remove & add new updated payment
            const index = this.order.payments.findIndex(c => c.paymentId === res.paymentId);
            this.order.payments.splice(index, 1, res);

            this.snackBar.open('Payment has been udpated', 'Success');
          }

          // Refresh mat-table data
          this.paymentDataSource._updateChangeSubscription();

          // Refresh total payment
          this.refreshTotalPayment();
        } else {
          this.snackBar.open('An error has occurred, please try again', 'Error');
        }
      }
    });
  }

  deletePayment(payment: Payment) {
    this.sub$.add(
      this.paymentService.deletePayment(payment.paymentId).subscribe((res: boolean) => {
        if (res) {
          // Remove payment
          const index = this.order.payments.findIndex(c => c.paymentId === payment.paymentId);
          this.order.payments.splice(index, 1);

          // Refresh mat-table data
          this.paymentDataSource._updateChangeSubscription();

          // Update total payment
          this.refreshTotalPayment();

          this.snackBar.open('Payment deleted', 'Success');
        } else {
          this.snackBar.open(`Can't delete payment, please try again`, 'Error');
        }
      })
    );
  }

  private refreshTotalPayment() {
    this.order.paymentTotal = this.order.payments.reduce((a, b) => a + b.amount, 0);
  }

  togglePaymentExpansion() {
    this.showPaymentExpansion = !this.showPaymentExpansion;
  }

  // *Chart

  private refreshPieChart() {
    this.pieChartData = Object.assign([[]], [['Value', this.order.orderTotal], ['Cost', this.order.costTotal]]);
  }
}
