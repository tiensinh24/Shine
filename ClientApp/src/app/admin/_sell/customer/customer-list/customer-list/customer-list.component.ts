import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter
} from "@angular/core";
import { CustomerDataSource } from "../../_data-source/customer-data-source";
import { CustomerList } from "src/app/_shared/intefaces/sell/customer/customer-list";
import { SelectionModel } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { PagingParams } from "src/app/_shared/intefaces/public/paging-params";
import { SortParams } from "src/app/_shared/intefaces/public/sort-params";
import { CustomerService } from "src/app/_shared/services/sell/customer.service";
import { Router } from "@angular/router";
import { ConfirmDialogService } from "src/app/_shared/services/public/confirm-dialog.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { fromEvent, merge } from "rxjs";
import { debounceTime, distinctUntilChanged, tap } from "rxjs/operators";

@Component({
  selector: "app-customer-list",
  templateUrl: "./customer-list.component.html",
  styleUrls: ["./customer-list.component.scss"]
})
export class CustomerListComponent implements OnInit {
  dataSource: CustomerDataSource;
  displayedColumns = [
    { key: "select", value: "Select" },
    { key: "photo", value: "Photo" },
    { key: "personNumber", value: "Person Number" },
    { key: "gender", value: "Gender" },
    { key: "fullName", value: "Full Name" },
    { key: "dateOfBirth", value: "Birthday" },
    { key: "telephone", value: "Telephone" },
    { key: "fax", value: "Fax" },
    { key: "countryName", value: "Country" },
    { key: "email", value: "Email" },
    { key: "address", value: "Address" },
    { key: "rating", value: "Rating" },
    { key: "actions", value: "Actions" }
  ];
  columnsToDisplay = [
    "select",
    "photo",
    "personNumber",
    "gender",
    "fullName",
    "dateOfBirth",
    "telephone",
    "fax",
    "countryName",
    "email",
    "address",
    "rating",
    "actions"
  ];
  selection = new SelectionModel<CustomerList>(true, []);
  numRows: number;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild("input", { static: true }) input: ElementRef;

  // Output
  @Output() displayMode = new EventEmitter<boolean>();

  pagingParams = <PagingParams>{
    pageIndex: 0,
    pageSize: 8
  };

  sortParams = <SortParams>{
    sortColumn: "",
    sortOrder: ""
  };

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private confirmService: ConfirmDialogService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.dataSource = new CustomerDataSource(this.customerService);
    this.dataSource.loadData(this.pagingParams, this.sortParams);
  }

  ngAfterViewInit(): void {
    // Server-side search
    fromEvent(this.input.nativeElement, "keyup")
      .pipe(
        debounceTime(250),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadCustomersPage();
        })
      )
      .subscribe();

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    // on sort or paginate events, load a new page
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => {
          this.loadCustomersPage();
          setTimeout(() => this.selection.clear(), 50);
        })
      )
      .subscribe();
  }

  loadCustomersPage() {
    this.pagingParams.pageIndex = this.paginator.pageIndex;
    this.pagingParams.pageSize = this.paginator.pageSize;

    this.sortParams.sortColumn = this.sort.active;
    this.sortParams.sortOrder = this.sort.direction;

    const filter = this.input.nativeElement.value;

    this.dataSource.loadData(this.pagingParams, this.sortParams, filter);
  }

  onCreate() {
    this.router.navigate(["/admin/sell/customer/create"]);
  }

  onEdit(customer: CustomerList) {
    this.router.navigate([`/admin/sell/customer/${customer.personId}/edit`]);
  }

  onDelete(customer: CustomerList) {
    const dialogRef = this.confirmService.openDialog(
      `Are you sure to delete ${customer.fullName}?`
    );

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.customerService.deleteCustomer(customer.personId).subscribe(() => {
          this.loadCustomersPage();
          this.snackBar.open(`${customer.fullName} deleted`, "Success");
          setTimeout(() => this.selection.clear(), 50);
        });
      }
    });
  }

  onDeleteSelected() {
    let customers: CustomerList[];
    const customersToDelete: string[] = [];
    this.dataSource.data.subscribe(data => (customers = data));

    const dialogRef = this.confirmService.openDialog(
      `Are you sure to delete those customers`
    );

    dialogRef.afterClosed().subscribe((res: boolean) => {
      if (res) {
        customers.forEach(customer => {
          if (this.selection.isSelected(customer)) {
            customersToDelete.push(customer.personId.toString());
          }
        });
        this.customerService
          .deleteCustomers(customersToDelete)
          .subscribe((resp: boolean) => {
            if (resp) {
              this.loadCustomersPage();
              this.snackBar.open("Customers deleted", "Success");
            } else {
              this.snackBar.open("Can not delete customers", "Error");
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

  clearFilter() {
    this.input.nativeElement.value = null;
    this.loadCustomersPage();
  }

  // *Output
  outDisplayMode() {
    this.displayMode.emit(false);
  }
}
