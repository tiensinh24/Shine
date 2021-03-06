import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger
} from "@angular/animations";
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  Output,
  EventEmitter
} from "@angular/core";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { fromEvent, of } from "rxjs";
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  finalize,
  tap
} from "rxjs/operators";
import { SupplierList } from "src/app/_shared/intefaces/buy/supplier/supplier-list";
import { Paging } from "src/app/_shared/intefaces/public/paging";
import { PagingParams } from "src/app/_shared/intefaces/public/paging-params";
import { SortParams } from "src/app/_shared/intefaces/public/sort-params";
import { SupplierService } from "src/app/_shared/services/buy/supplier.service";
import { PagedSupplier } from "src/app/_shared/intefaces/buy/supplier/paged-supplier";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Supplier } from "src/app/_shared/intefaces/buy/supplier/supplier";
import { ConfirmDialogService } from "src/app/_shared/services/public/confirm-dialog.service";

@Component({
  selector: "app-supplier-card",
  templateUrl: "./supplier-card.component.html",
  styleUrls: ["./supplier-card.component.scss"],
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
export class SupplierCardComponent implements OnInit, AfterViewInit {
  mainPhotoUrl = "assets/default.jpg";

  suppliers: SupplierList[];
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
    private supplierService: SupplierService,
    private router: Router,
    private snackBar: MatSnackBar,
    private confirmService: ConfirmDialogService
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
          this.loadSuppliersPage();
        })
      )
      .subscribe();

    this.paginator.page
      .pipe(
        tap(() => {
          this.loadSuppliersPage();
        })
      )
      .subscribe();
  }

  loadData(pagingParams: PagingParams, sortParams?: SortParams, filter = "") {
    this.loading = true;

    this.supplierService
      .getPagedSuppliers(pagingParams, sortParams, filter)
      .pipe(
        catchError(() => of([])),
        finalize(() => (this.loading = false))
      )
      .subscribe((res: PagedSupplier) => {
        this.suppliers = res.items;
        this.paging = res.paging;
      });
  }

  loadSuppliersPage() {
    this.pagingParams.pageIndex = this.paginator.pageIndex;
    this.pagingParams.pageSize = this.paginator.pageSize;

    const filter = this.input.nativeElement.value;

    this.loadData(this.pagingParams, this.sortParams, filter);
  }

  onCreate() {
    this.router.navigate(["/admin/buy/supplier/create"]);
  }

  onEdit(supplier: Supplier) {
    this.router.navigate([`/admin/buy/supplier/${supplier.personId}/edit`]);
  }

  onDelete(supplier: Supplier) {
    const dialogRef = this.confirmService.openDialog(
      `Are you sure to delete ${supplier.firstName} ${supplier.lastName}?`
    );

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.supplierService.deleteSupplier(supplier.personId).subscribe(() => {
          this.loadSuppliersPage();
          this.snackBar.open(
            `${supplier.firstName} ${supplier.lastName} deleted`,
            "Success"
          );
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
    this.loadSuppliersPage();
  }

  // *Output
  outDisplayMode() {
    this.displayMode.emit(true);
  }
}
