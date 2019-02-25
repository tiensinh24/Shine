import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
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
import { map } from 'rxjs/operators';

import { ProductBuyListDto } from '../_interfaces/productBuyListDto';
import { ProductBuyService } from '../_services/product-buy.service';
import { ProductBuy } from '../_interfaces/product-buy';
import { CategoryBuy } from 'src/app/category/buy/_interfaces/categoryBuy';
import { CategoryBuyService } from 'src/app/category/buy/_services/category-buy.service';
import { ProductBuyEditDialogComponent } from 'src/app/_shared/components/product-buy-edit-dialog/product-buy-edit-dialog.component';

@Component({
  selector: 'app-product-buy-list',
  templateUrl: './product-buy-list.component.html',
  styleUrls: ['./product-buy-list.component.css'],
})
export class ProductBuyListComponent implements OnInit, AfterViewInit {
  displayedColumns = [
    'select',
    'name',
    'specification',
    'price',
    'categoryName',
    'actions',
  ];
  dataSource = new MatTableDataSource<ProductBuyListDto>([]);
  selection = new SelectionModel<ProductBuyListDto>(true, []);
  isLoading = true;
  title = 'Products List';
  categories: CategoryBuy[];
  routeEditSub: Subscription;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private productBuyService: ProductBuyService,
    private categoryBuyService: CategoryBuyService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.getCategories();
  }

  ngAfterViewInit(): void {
    this.getProductList();
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
        price: prodEdit.price,
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
    dialogRef.afterClosed().subscribe((res: ProductBuyListDto) => {
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

  refreshData() {}

  getCategories() {
    this.categoryBuyService.getCategoryList().subscribe(res => {
      this.categories = res;
    });
  }

  getProductList() {
    this.productBuyService.getProductList().subscribe(
      res => {
        // Check to loading progress bar
        this.isLoading = false;

        this.dataSource = new MatTableDataSource<ProductBuyListDto>(res);
        setTimeout(() => (this.dataSource.sort = this.sort));
        setTimeout(() => (this.dataSource.paginator = this.paginator));
      },
      () => (this.isLoading = false),
    );
  }

  onCreate() {
    // Send categories to edit component
    // this.router.navigateByUrl('/product-buy/create', {
    //   state: { categories: this.categories },
    // });
    this.openDialog(0);
  }

  onDetail(productBuy: ProductBuy) {
    this.router.navigate(['product-buy', productBuy.productId]);
  }

  onEdit(productBuy: ProductBuy) {
    // Send current product, categories to edit component
    // this.router.navigateByUrl(`/product-buy/edit/${productBuy.productId}`, { state: { product: productBuy, categories: this.categories } });
    this.openDialog(productBuy.productId);
  }

  onDelete(productBuy: ProductBuy) {
    // this.productBuyService.deleteProduct(productBuy.productId).subscribe(() => {
    //   // Get index of deleted row
    //   const index = this.dataSource.data.indexOf(productBuy, 0);
    //   // Remove row, update dataSource & remove all selection
    //   if (index > -1) {
    //     this.dataSource.data.splice(index, 1);
    //     this.dataSource._updateChangeSubscription();
    //     this.selection.clear();
    //   }
    // });
  }

  // On input focus: setup filterPredicate to only filter by input column
  setupFilter(column?: string) {
    // Only filter specify column
    if (column.length > 0) {
      this.dataSource.filterPredicate = (
        data: ProductBuyListDto,
        filter: string,
      ) => {
        const textToSearch = (data[column] && data[column].toLowerCase()) || '';
        return textToSearch.indexOf(filter) !== -1;
      };
    } else {
      // If column = '', filter on all column
      this.dataSource.filterPredicate = (
        data: ProductBuyListDto,
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
