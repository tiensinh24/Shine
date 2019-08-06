import { SelectionModel } from "@angular/cdk/collections";
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ElementRef
} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { Router } from "@angular/router";

import { ProductSell } from "../../../../_shared/intefaces/sell/product/product-sell";
import { ProductSellService } from "../../../../_shared/services/sell/product-sell.service";
import { ProductSellDataSource } from "../_data-source/product-sell-data-source";
import { ProductSellList } from "src/app/_shared/intefaces/sell/product/ProductSellList";
import { PagingParams } from "src/app/_shared/intefaces/public/paging-params";
import { SortParams } from "src/app/_shared/intefaces/public/sort-params";
import { ConfirmDialogService } from "src/app/_shared/services/public/confirm-dialog.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { fromEvent, merge } from "rxjs";
import { debounceTime, distinctUntilChanged, tap } from "rxjs/operators";

@Component({
  selector: "app-product-sell-list",
  templateUrl: "./product-sell-list.component.html",
  styleUrls: ["./product-sell-list.component.css"]
})
export class ProductSellListComponent implements OnInit, AfterViewInit {
  dataSource: ProductSellDataSource;
  displayedColumns = [
    "select",
    "photo",
    "productName",
    "specification",
    "categoryName",
    "actions"
  ];
  selection = new SelectionModel<ProductSellList>(true, []);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
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
    private productSellService: ProductSellService,
    private router: Router,
    private confirmService: ConfirmDialogService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.dataSource = new ProductSellDataSource(this.productSellService);
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
          this.loadProductsPage();
        })
      )
      .subscribe();

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    // on sort or paginate events, load a new page
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => {
          this.loadProductsPage();
          setTimeout(() => this.selection.clear(), 50);
        })
      )
      .subscribe();
  }

  loadProductsPage() {
    this.pagingParams.pageIndex = this.paginator.pageIndex;
    this.pagingParams.pageSize = this.paginator.pageSize;

    this.sortParams.sortColumn = this.sort.active;
    this.sortParams.sortOrder = this.sort.direction;

    const filter = this.input.nativeElement.value;

    this.dataSource.loadData(this.pagingParams, this.sortParams, filter);
  }

  onCreate() {
    // this.openDialog(0);
    this.router.navigate(["/admin/sell/product/create"]);
  }

  onDetail(productSell: ProductSell) {
    this.router.navigate(["/admin/sell/product", productSell.productId]);
  }

  onEdit(productSell: ProductSell) {
    this.router.navigate(["/admin/sell/product/edit/", productSell.productId]);
  }

  onDelete(productSell: ProductSell) {
    const dialogRef = this.confirmService.openDialog(
      `Are you sure to delete ${productSell.productName}?`
    );

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.productSellService
          .deleteProduct(productSell.productId)
          .subscribe(() => {
            this.loadProductsPage();
            this.snackBar.open(`${productSell.productName} deleted`, "Success");
            setTimeout(() => this.selection.clear(), 50);
          });
      }
    });
  }

  onDeleteSelected() {
    let products: ProductSellList[];
    const productsToDelete: string[] = [];
    this.dataSource.data.subscribe(data => (products = data));

    const dialogRef = this.confirmService.openDialog(
      `Are you sure to delete those products?`
    );

    dialogRef.afterClosed().subscribe((res: boolean) => {
      if (res) {
        products.forEach(product => {
          if (this.selection.isSelected(product)) {
            productsToDelete.push(product.productId.toString());
          }
        });
        this.productSellService
          .deleteProducts(productsToDelete)
          .subscribe((resp: boolean) => {
            if (resp) {
              this.loadProductsPage();
              this.snackBar.open("Products deleted", "Success");
            } else {
              this.snackBar.open("Can not delete products", "Error");
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
    this.loadProductsPage();
  }
}
