import { Component, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import {
  MatPaginator,
  MatTableDataSource,
  MatSort,
  MatDialogConfig,
  MatDialog,
} from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { Subscription } from 'rxjs';

import { ProductBuyDto } from '../_interfaces/product-buy-dto';
import { ProductBuyService } from '../_services/product-buy.service';
import { ProductBuy } from '../_interfaces/product-buy';
import { CategoryBuy } from 'src/app/category/buy/_interfaces/category-buy';
import { CategoryBuyService } from 'src/app/category/buy/_services/category-buy.service';
import { ProductBuyEditDialogComponent } from 'src/app/_shared/components/product-buy-edit-dialog/product-buy-edit-dialog.component';

@Component({
  selector: 'app-product-buy-list',
  templateUrl: './product-buy-list.component.html',
  styleUrls: ['./product-buy-list.component.css'],
})
export class ProductBuyListComponent implements AfterViewInit, OnDestroy {
  displayedColumns = [
    'select',
    'name',
    'specification',
    'categoryName',
    'actions',
  ];
  dataSource = new MatTableDataSource<ProductBuyDto>([]);
  selection = new SelectionModel<ProductBuyDto>(true, []);
  isLoading = true;
  title = 'Products List';
  categories: CategoryBuy[];
  sub = new Subscription();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private productBuyService: ProductBuyService,
    private categoryBuyService: CategoryBuyService,
    private router: Router,
    private dialog: MatDialog,
  ) {}

  ngAfterViewInit(): void {
    this.getProductList();
    this.getCategories();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getCategories() {
    this.sub = this.categoryBuyService.getCategoryList().subscribe(res => {
      this.categories = res;
    });
  }

  getProductList() {
    this.sub = this.productBuyService.getProducts().subscribe(
      res => {
        // Check to loading progress bar
        this.isLoading = false;

        this.dataSource = new MatTableDataSource<ProductBuyDto>(res);
        setTimeout(() => (this.dataSource.sort = this.sort));
        setTimeout(() => (this.dataSource.paginator = this.paginator));
      },
      () => (this.isLoading = false),
    );
  }

  onCreate() {
    this.openDialog(0);
  }

  onDetail(productBuy: ProductBuy) {
    this.router.navigate(['product-buy', productBuy.productId]);
  }

  onEdit(productBuy: ProductBuy) {
    this.openDialog(productBuy.productId);
  }

  onDelete(productBuy: ProductBuy) {
    this.productBuyService.deleteProduct(productBuy.productId).subscribe(() => {
      // Get index of deleted row
      const index = this.dataSource.data.indexOf(<ProductBuyDto>productBuy, 0);
      // Remove row, update dataSource & remove all selection
      if (index > -1) {
        this.dataSource.data.splice(index, 1);
        this.dataSource._updateChangeSubscription();
        this.selection.clear();
      }
    });
  }

  // Open product-buy-edit dialog
  openDialog(productId?: number) {
    const prodEdit = this.dataSource.data.find(p => p.productId === productId);

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    // Width & height
    dialogConfig.maxWidth = '100vw';
    dialogConfig.maxHeight = '100vh';
    dialogConfig.minWidth = '100%';
    dialogConfig.height = '100%';

    // Send data to product edit dialog component
    if (prodEdit) {
      dialogConfig.data = {
        productId: prodEdit.productId,
        name: prodEdit.name,
        specification: prodEdit.specification,
        categoryId: prodEdit.categoryId,
        categories: this.categories,
      };
    } else {
      dialogConfig.data = {
        categories: this.categories
      };
    }

    const dialogRef = this.dialog.open(
      ProductBuyEditDialogComponent,
      dialogConfig,
    );

    // Get data returned from product-edit dialog
    dialogRef.afterClosed().subscribe((res: ProductBuyDto) => {
      // Check if res exists
      if (res) {
        const index = this.dataSource.data.findIndex(
          p => p.productId === res.productId,
        );

        // Check if data returned is an updated product or a new one
        if (index > -1) {
          // Update dataSource
          this.dataSource.data.splice(index, 1, res);
          this.dataSource._updateChangeSubscription();
        } else {
          // Add new product to dataSource
          this.dataSource.data.push(res);
          this.dataSource._updateChangeSubscription();
        }
      }
      this.selection.clear();
    });
  }


  // On input focus: setup filterPredicate to only filter by input column
  setupFilter(column?: string) {
    // Only filter specify column
    if (column.length > 0) {
      this.dataSource.filterPredicate = (
        data: ProductBuyDto,
        filter: string,
      ) => {
        const textToSearch = (data[column] && data[column].toLowerCase()) || '';
        return textToSearch.indexOf(filter) !== -1;
      };
    } else {
      // If column = '', filter on all column
      this.dataSource.filterPredicate = (
        data: ProductBuyDto,
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
