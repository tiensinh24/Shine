import { fromEvent, merge } from "rxjs";
import { debounceTime, distinctUntilChanged, tap } from "rxjs/operators";
import { OrderBuyService } from "src/app/_shared/services/buy/order-buy.service";
import { SelectionModel } from "@angular/cdk/collections";
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild
} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { ActivatedRoute } from "@angular/router";

import { SupplierOrdersDataSource } from "../../_data-source/supplier-orders-data-source";
import { SupplierOrders } from "src/app/_shared/intefaces/buy/supplier/supplier-orders";
import { PagingParams } from "src/app/_shared/intefaces/public/paging-params";
import { SortParams } from "src/app/_shared/intefaces/public/sort-params";
import { SupplierService } from "src/app/_shared/services/buy/supplier.service";
import { ConfirmDialogService } from "src/app/_shared/services/public/confirm-dialog.service";

@Component({
  selector: "app-supplier-orders",
  templateUrl: "./supplier-orders.component.html",
  styleUrls: ["./supplier-orders.component.scss"]
})
export class SupplierOrdersComponent implements OnInit, AfterViewInit {
  dataSource: SupplierOrdersDataSource;
  displayedColumns = [
    "select",
    "orderNumber",
    "dateOfIssue",
    "timeForPayment",
    "rating",
    "actions"
  ];
  selection = new SelectionModel<SupplierOrders>(true, []);
  supplierId = +this.route.snapshot.params.supplierId;

  @Output() avgRating = new EventEmitter<number>();

  @ViewChild(MatPaginator, { static: false }) paginator = <MatPaginator>{};
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild("input", { static: false }) input: ElementRef;

  pagingParams = <PagingParams>{
    pageIndex: 0,
    pageSize: 8
  };

  sortParams = <SortParams>{
    sortColumn: "",
    sortOrder: ""
  };

  constructor(
    private supplierService: SupplierService,
    private orderBuyService: OrderBuyService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private confirmDialogService: ConfirmDialogService
  ) {}

  ngOnInit() {
    this.dataSource = new SupplierOrdersDataSource(this.supplierService);
    this.dataSource.loadData(
      this.supplierId,
      this.pagingParams,
      this.sortParams
    );
  }

  ngAfterViewInit(): void {
    // Server-side search
    fromEvent(this.input.nativeElement, "keyup")
      .pipe(
        debounceTime(250),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.paginator.pageSize = 8;
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

    this.dataSource.loadData(
      this.supplierId,
      this.pagingParams,
      this.sortParams,
      filter
    );
  }

  deleteOrder(order: SupplierOrders) {
    const dialogRef = this.confirmDialogService.openDialog(
      `Are you sure to delete order ${order.orderNumber}?`
    );

    dialogRef.afterClosed().subscribe((resp: boolean) => {
      if (resp) {
        this.orderBuyService.deleteOrder(order.orderId).subscribe(res => {
          if (res) {
            this.loadOrdersPage();
            this.outRating();
          }
        });
        this.snackBar.open(`${order.orderNumber} deleted`, "Success");
      }
    });
  }

  outRating() {
    this.dataSource.data.subscribe((orders: SupplierOrders[]) => {
      let avgRating = 0;
      let sum = 0;
      orders.forEach(order => {
        sum += order.rating;
      });
      if (orders.length > 0) {
        avgRating = sum / orders.length;
      }
      this.avgRating.emit(avgRating);
    });
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.paginator ? this.paginator.pageSize : 0;

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
