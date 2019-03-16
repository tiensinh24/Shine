import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatSnackBar } from '@angular/material';
import { OrderBuyDto } from '../_interfaces/order-buy-dto';
import { SelectionModel } from '@angular/cdk/collections';
import { Subscription } from 'rxjs';
import { OrderBuyService } from '../_services/order-buy.service';
import { Router } from '@angular/router';
import { OrderBuy } from '../_interfaces/order-buy';
import { SupplierDto } from 'src/app/supplier/_interfaces/supplier-dto';
import { SupplierService } from 'src/app/supplier/_services/supplier.service';
import { ConfirmDialogService } from 'src/app/_shared/_services/confirm-dialog.service';

@Component({
  selector: 'app-order-buy-list',
  templateUrl: './order-buy-list.component.html',
  styleUrls: ['./order-buy-list.component.css']
})
export class OrderBuyListComponent implements AfterViewInit, OnDestroy {
  displayedColumns = [
    'select',
    'orderNumber',
    'dateOfIssue',
    'timeForPayment',
    'supplierName',
    'actions',
  ];
  dataSource = new MatTableDataSource<OrderBuyDto>([]);
  selection = new SelectionModel<OrderBuyDto>(true, []);
  suppliers: SupplierDto[] = [];
  isLoading = true;
  title = 'Order List';

  orderSub = new Subscription();
  suppliersSub = new Subscription();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private orderBuyService: OrderBuyService,
    private supplierService: SupplierService,
    private router: Router,
    private dialog: MatDialog,
    private confirmService: ConfirmDialogService,
    private snackBar: MatSnackBar,
  ) {}

  ngAfterViewInit(): void {
    this.getOrders();
    this.getSuppliers();
  }

  ngOnDestroy(): void {
    this.orderSub.unsubscribe();
    this.suppliersSub.unsubscribe();
  }

  getOrders() {
    this.orderSub = this.orderBuyService.getOrders().subscribe(res => {
        // Check to loading progress bar
        this.isLoading = false;

        this.dataSource = new MatTableDataSource<OrderBuyDto>(res);
        setTimeout(() => (this.dataSource.sort = this.sort));
        setTimeout(() => (this.dataSource.paginator = this.paginator));
      },
      () => (this.isLoading = false)
    );
  }

  getSuppliers() {
    this.suppliersSub = this.supplierService.getSuppliers().subscribe(res => {
      this.suppliers = res;
    })
  }

  onCreate() {
    this.router.navigate(['order-buy/create']);
  }

  onDetail(orderBuy: OrderBuy) {
    this.router.navigate(['order-buy', orderBuy.orderId]);
  }

  onDelete(orderBuy: OrderBuy) {
    const dialogRef = this.confirmService.openDialog(`Are you sure to delete order ${orderBuy.orderNumber}?`);

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.orderBuyService.deleteOrder(orderBuy.orderId).subscribe(() => {
          // Get index of deleted row
          const index = this.dataSource.data.indexOf(<OrderBuyDto>orderBuy, 0);
          // Remove row, update dataSource & remove all selection
          if (index > -1) {
            this.dataSource.data.splice(index, 1);
            this.dataSource._updateChangeSubscription();
            this.selection.clear();
          }
        });
        this.snackBar.open(`Order ${orderBuy.orderNumber} deleted`, 'Success');
      }
    });
  }

  // On input focus: setup filterPredicate to only filter by input column
  setupFilter(column?: string) {
    // Only filter specify column
    if (column.length > 0) {
      this.dataSource.filterPredicate = (
        data: OrderBuyDto,
        filter: string,
      ) => {
        const textToSearch = (data[column] && data[column].toLowerCase()) || '';
        return textToSearch.indexOf(filter) !== -1;
      };
    } else {
      // If column = '', filter on all column
      this.dataSource.filterPredicate = (
        data: OrderBuyDto,
        filter: string,
      ) => {
        const textToSearch =
          (JSON.stringify(data) && JSON.stringify(data).toLowerCase()) || '';
        return textToSearch.indexOf(filter) !== -1;
      };
    }
  }

  applyFilter(filterValue: string) {
    if (filterValue === undefined) {
      this.dataSource.filter = '';
    } else {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Whether the number of selected elements matches the total number of rows
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  //  Selects all rows if they are not all selected; otherwise clear selection
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }
}
