import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef
} from "@angular/core";
import { trigger, transition, style, animate } from "@angular/animations";
import { OrderSellDataSource } from "../_data-source/order-sell-data-source";
import { SelectionModel } from "@angular/cdk/collections";
import { OrderSellList } from "src/app/_shared/intefaces/sell/order/order-sell-list";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { PagingParams } from "src/app/_shared/intefaces/public/paging-params";
import { SortParams } from "src/app/_shared/intefaces/public/sort-params";
import { OrderSellQuery } from "src/app/_shared/intefaces/sell/order/query/order-sell-query";
import { FormGroup, FormBuilder } from "@angular/forms";
import { OrderSellService } from "src/app/_shared/services/sell/order-sell.service";
import { Router } from "@angular/router";
import { ConfirmDialogService } from "src/app/_shared/services/public/confirm-dialog.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { fromEvent, merge } from "rxjs";
import { distinctUntilChanged, debounceTime, tap } from "rxjs/operators";
import { OrderSell } from "src/app/_shared/intefaces/sell/order/order-sell";

@Component({
  selector: "app-order-sell-list",
  templateUrl: "./order-sell-list.component.html",
  styleUrls: ["./order-sell-list.component.scss"],
  animations: [
    trigger("flyInOutHoz", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateX(100px)" }),
        animate(
          "500ms cubic-bezier(0.35, 0, 0.25, 1)",
          style({ opacity: 1, transform: "none" })
        )
      ]),
      transition(":leave", [
        animate(
          "500ms cubic-bezier(0.35, 0, 0.25, 1)",
          style({ opacity: 0, transform: "translateX(100px)" })
        )
      ])
    ])
  ]
})
export class OrderSellListComponent implements OnInit, AfterViewInit {
  dataSource: OrderSellDataSource;
  displayedColumns = [
    { key: "select", value: "Select" },
    { key: "orderNumber", value: "Order Number" },
    { key: "dateOfIssue", value: "Order Date" },
    { key: "timeForPayment", value: `Payment's Time` },
    { key: "customerName", value: "Customer" },
    { key: "employeeName", value: "Employee" },
    { key: "value", value: "Values" },
    { key: "cost", value: "Cost" },
    { key: "rating", value: "Rating" },
    { key: "actions", value: "Actions" }
  ];
  columnsToDisplay = [
    "select",
    "orderNumber",
    "dateOfIssue",
    "timeForPayment",
    "customerName",
    "employeeName",
    "value",
    "cost",
    "rating",
    "actions"
  ];

  selection = new SelectionModel<OrderSellList>(true, []);
  title = "Order List";

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild("input", { static: true }) private input: ElementRef;

  pagingParams = <PagingParams>{
    pageIndex: 0,
    pageSize: 8
  };

  sortParams = <SortParams>{
    sortColumn: "",
    sortOrder: ""
  };

  queryParams = <OrderSellQuery>{};

  // boolean
  showFilter = false;

  // Formgroup
  filterForm: FormGroup;

  constructor(
    private orderSellService: OrderSellService,
    private fb: FormBuilder,
    private router: Router,
    private confirmService: ConfirmDialogService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.dataSource = new OrderSellDataSource(this.orderSellService);
    this.dataSource.loadData(
      this.pagingParams,
      this.sortParams,
      this.queryParams
    );

    this.createFilterForm();
  }

  ngAfterViewInit(): void {
    // Server-side search
    fromEvent(this.input.nativeElement, "keyup")
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

  createFilterForm() {
    this.filterForm = this.fb.group({
      fromDate: [""],
      toDate: [""]
    });
  }

  loadOrdersPage() {
    this.pagingParams.pageIndex = this.paginator.pageIndex;
    this.pagingParams.pageSize = this.paginator.pageSize;

    this.sortParams.sortColumn = this.sort.active;
    this.sortParams.sortOrder = this.sort.direction;

    if (this.filterForm.value.fromDate) {
      this.queryParams.fromDate = this.filterForm.value.fromDate.format(
        "YYYY-MM-DD"
      );

      if (this.queryParams.customerId === undefined) {
        this.queryParams.customerId = 0;
      }

      if (this.queryParams.employeeId === undefined) {
        this.queryParams.employeeId = 0;
      }
    }

    if (this.filterForm.value.toDate) {
      this.queryParams.toDate = this.filterForm.value.toDate.format(
        "YYYY-MM-DD"
      );
    }

    const filter = this.input.nativeElement.value;

    this.dataSource.loadData(
      this.pagingParams,
      this.sortParams,
      this.queryParams,
      filter
    );
  }

  onCreate() {
    this.router.navigate(["/admin/sell/order/create"]);
  }

  onDetail(orderSell: OrderSell) {
    this.router.navigate(["/admin/sell/order", orderSell.orderId]);
  }

  onEdit(orderSell: OrderSell) {
    this.router.navigate([`/admin/sell/order/${orderSell.orderId}/edit`]);
  }

  onDelete(orderSell: OrderSell) {
    const dialogRef = this.confirmService.openDialog(
      `Are you sure to delete order ${orderSell.orderNumber}?`
    );

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.orderSellService.deleteOrder(orderSell.orderId).subscribe(() => {
          this.loadOrdersPage();
        });
        this.snackBar.open(`Order ${orderSell.orderNumber} deleted`, "Success");
        setTimeout(() => this.selection.clear(), 50);
      }
    });
  }

  onDeleteSelected() {
    let orders: OrderSellList[];
    const ordersToDelete: string[] = [];
    this.dataSource.data.subscribe(data => (orders = data));

    const dialogRef = this.confirmService.openDialog(
      `Are you sure to delete those orders?`
    );

    dialogRef.afterClosed().subscribe((res: boolean) => {
      if (res) {
        orders.forEach(order => {
          if (this.selection.isSelected(order)) {
            ordersToDelete.push(order.orderId.toString());
          }
        });
        this.orderSellService
          .deleteOrders(ordersToDelete)
          .subscribe((resp: boolean) => {
            if (resp) {
              this.loadOrdersPage();
              this.snackBar.open("Orders deleted", "Success");
            } else {
              this.snackBar.open("Can not delete orders", "Error");
            }
            setTimeout(() => this.selection.clear(), 50);
          });
      }
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

  toggleFilter() {
    this.showFilter = !this.showFilter;
  }

  clearFilter() {
    this.filterForm.reset();
    this.queryParams = {};
    this.loadOrdersPage();
  }

  clearFilterControl(control: string) {
    this.filterForm.controls[control].reset();
  }

  clearSearch() {
    this.input.nativeElement.value = "";
    this.queryParams = {};
    this.loadOrdersPage();
  }
}
