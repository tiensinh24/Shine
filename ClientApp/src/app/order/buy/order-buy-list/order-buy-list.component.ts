import { equal, strictEqual } from 'assert';
import { fromEvent, merge, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { PagingParams } from 'src/app/_shared/_intefaces/paging-params';
import { SortParams } from 'src/app/_shared/_intefaces/sort-params';
import { ConfirmDialogService } from 'src/app/_shared/_services/confirm-dialog.service';
import {
    OrderBuyEditDialogComponent
} from 'src/app/_shared/components/order-buy-edit-dialog/order-buy-edit-dialog.component';
import { SupplierList } from 'src/app/supplier/_interfaces/supplier-list';

import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
    MatDialog,
    MatDialogConfig,
    MatMenuTrigger,
    MatPaginator,
    MatSelectionList,
    MatSnackBar,
    MatSort,
    MatTableDataSource
} from '@angular/material';
import { Router } from '@angular/router';

import { OrderBuyDataSource } from '../_data-source/order-buy-data-source';
import { OrderBuy } from '../_interfaces/order-buy';
import { OrderBuyList } from '../_interfaces/order-buy-list';
import { OrderBuyService } from '../_services/order-buy.service';

@Component({
  selector: 'app-order-buy-list',
  templateUrl: './order-buy-list.component.html',
  styleUrls: ['./order-buy-list.component.css']
})
export class OrderBuyListComponent implements OnInit, AfterViewInit {
  dataSource: OrderBuyDataSource;
  displayedColumns = [
    { key: 'select', value: 'Select' },
    { key: 'orderNumber', value: 'Order Number' },
    { key: 'dateOfIssue', value: 'Order Date' },
    { key: 'timeForPayment', value: `Payment's Time` },
    { key: 'supplierName', value: 'Supplier' },
    { key: 'employeeName', value: 'Employee' },
    { key: 'value', value: 'Values' },
    { key: 'cost', value: 'Cost' },
    { key: 'rating', value: 'Rating' },
    { key: 'actions', value: 'Actions' }
  ];
  columnsToDisplay = [
    'select',
    'orderNumber',
    'dateOfIssue',
    'timeForPayment',
    'supplierName',
    'employeeName',
    'value',
    'cost',
    'rating',
    'actions'
  ];

  selection = new SelectionModel<OrderBuyList>(true, []);
  title = 'Order List';

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('input') private input: ElementRef;

  pagingParams = <PagingParams>{
    pageIndex: 0,
    pageSize: 8
  };

  sortParams = <SortParams>{
    sortColumn: '',
    sortOrder: ''
  };

  constructor(
    private orderBuyService: OrderBuyService,
    private router: Router,
    private confirmService: ConfirmDialogService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.dataSource = new OrderBuyDataSource(this.orderBuyService);
    this.dataSource.loadData(this.pagingParams, this.sortParams);
  }

  ngAfterViewInit(): void {
    // Server-side search
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(250),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadOrdersPage();
        })
      )
      .subscribe();

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    // on sort or paginate events, load a new page
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => {
          this.loadOrdersPage();
          setTimeout(() => this.selection.clear(), 50);
        })
      )
      .subscribe();
  }

  loadOrdersPage() {
    this.pagingParams.pageIndex = this.paginator.pageIndex;
    this.pagingParams.pageSize = this.paginator.pageSize;

    this.sortParams.sortColumn = this.sort.active;
    this.sortParams.sortOrder = this.sort.direction;

    const filter = this.input.nativeElement.value;

    this.dataSource.loadData(this.pagingParams, this.sortParams, filter);
  }

  onCreate() {
    this.router.navigate(['order-buy/create']);
  }

  onDetail(orderBuy: OrderBuy) {
    this.router.navigate(['order-buy', orderBuy.orderId]);
  }

  onEdit(orderBuy: OrderBuy) {
    this.openDialog(orderBuy.orderId);
  }

  onDelete(orderBuy: OrderBuy) {
    const dialogRef = this.confirmService.openDialog(`Are you sure to delete order ${orderBuy.orderNumber}?`);

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.orderBuyService.deleteOrder(orderBuy.orderId).subscribe(() => {
          this.loadOrdersPage();
        });
        this.snackBar.open(`Order ${orderBuy.orderNumber} deleted`, 'Success');
        setTimeout(() => this.selection.clear(), 50);
      }
    });
  }

  onDeleteSelected() {
    let orders: OrderBuyList[];
    const ordersToDelete: string[] = [];
    this.dataSource.data.subscribe(data => (orders = data));

    const dialogRef = this.confirmService.openDialog(`Are you sure to delete those orders?`);

    dialogRef.afterClosed().subscribe((res: boolean) => {
      if (res) {
        orders.forEach(order => {
          if (this.selection.isSelected(order)) {
            ordersToDelete.push(order.orderId.toString());
          }
        });
        this.orderBuyService.deleteOrders(ordersToDelete).subscribe((resp: boolean) => {
          if (resp) {
            this.loadOrdersPage();
            this.snackBar.open('Orders deleted', 'Success');
          } else {
            this.snackBar.open('Can not delete orders', 'Error');
          }
          setTimeout(() => this.selection.clear(), 50);
        });
      }
    });
  }

  // Open order-buy-edit-dialog
  openDialog(orderId?: number) {
    // Find order in dataSource
    let orderEdit: OrderBuyList = null;

    this.dataSource.data.subscribe(res => {
      orderEdit = res.find(c => c.orderId === orderId);
    });

    const dialogConfig = <MatDialogConfig>{
      disableClose: true,
      autoFocus: false,
      maxWidth: '100vw',
      maxHeight: '100vh',
      width: '800px',
      height: '585px',
      panelClass: 'custom-dialog'
    };

    if (orderId > 0) {
      dialogConfig.data = {
        rating: orderEdit.rating,
        orderId: orderEdit.orderId,
        orderNumber: orderEdit.orderNumber,
        dateOfIssue: orderEdit.dateOfIssue,
        timeForPayment: orderEdit.timeForPayment,
        personId: orderEdit.personId,
        supplierName: orderEdit.supplierName
      };
    }

    // Open dialog with config & passed data
    const dialogRef = this.dialog.open(OrderBuyEditDialogComponent, dialogConfig);

    // Pass data from dialog in to main component
    dialogRef.afterClosed().subscribe((data: OrderBuyList) => {
      if (data) {
        this.loadOrdersPage();
        this.snackBar.open(`Order ${data.orderNumber} updated`, 'Success');
      }

      this.selection.clear();
    });
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.paginator.pageSize;

    return numSelected === numRows;
  }

  selectAll() {
    this.dataSource.data.subscribe(rows => {
      rows.forEach(row => this.selection.select(row));
    });
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.selectAll();
    }
  }
}
