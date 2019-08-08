import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter
} from "@angular/core";
import {
  trigger,
  transition,
  query,
  style,
  stagger,
  animate
} from "@angular/animations";
import { CustomerList } from "src/app/_shared/intefaces/sell/customer/customer-list";
import { Paging } from "src/app/_shared/intefaces/public/paging";
import { MatSort } from "@angular/material/sort";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { PagingParams } from "src/app/_shared/intefaces/public/paging-params";
import { SortParams } from "src/app/_shared/intefaces/public/sort-params";
import { CustomerService } from "src/app/_shared/services/sell/customer.service";
import { Router } from "@angular/router";
import { ConfirmDialogService } from "src/app/_shared/services/public/confirm-dialog.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { fromEvent, of } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  tap,
  catchError,
  finalize
} from "rxjs/operators";
import { PagedCustomer } from "src/app/_shared/intefaces/sell/customer/paged-customer";

@Component({
  selector: "app-customer-card",
  templateUrl: "./customer-card.component.html",
  styleUrls: ["./customer-card.component.scss"],
  animations: [
    trigger("flyInVez", [
      transition(":enter", [
        query(
          ".card, mat-card",
          [
            style({ opacity: 0, transform: "translateY(100px)" }),
            stagger(30, [
              animate(
                "500ms cubic-bezier(0.35, 0, 0.25, 1)",
                style({ opacity: 1, transform: "none" })
              )
            ])
          ],
          { optional: true }
        )
      ])
    ])
  ]
})
export class CustomerCardComponent implements OnInit, AfterViewInit {
  mainPhotoUrl = "assets/default.jpg";

  customers: CustomerList[];
  paging: Paging;
  loading: boolean;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild("input", { static: true }) input: ElementRef;
  @ViewChild("mainSection", { static: true }) mainSection: ElementRef;

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
    this.loadData(this.pagingParams, this.sortParams);
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

    this.paginator.page
      .pipe(
        tap(() => {
          this.loadCustomersPage();
        })
      )
      .subscribe();
  }

  loadData(pagingParams: PagingParams, sortParams?: SortParams, filter = "") {
    this.loading = true;

    this.customerService
      .getPagedCustomers(pagingParams, sortParams, filter)
      .pipe(
        catchError(() => of([])),
        finalize(() => (this.loading = false))
      )
      .subscribe((res: PagedCustomer) => {
        this.customers = res.items;
        this.paging = res.paging;
      });
  }

  loadCustomersPage() {
    this.pagingParams.pageIndex = this.paginator.pageIndex;
    this.pagingParams.pageSize = this.paginator.pageSize;

    const filter = this.input.nativeElement.value;

    this.loadData(this.pagingParams, this.sortParams, filter);
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
        });
      }
    });
  }

  OnPageChange(event: PageEvent) {
    this.pagingParams.pageIndex = event.pageIndex;
    this.pagingParams.pageSize = event.pageSize;
    const filter = this.input.nativeElement.value;
    this.loadData(this.pagingParams, this.sortParams, filter);

    // Scroll to top when goto other page
    this.mainSection.nativeElement.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  clearFilter() {
    this.input.nativeElement.value = null;
    this.loadCustomersPage();
  }

  // *Output
  outDisplayMode() {
    this.displayMode.emit(true);
  }
}
