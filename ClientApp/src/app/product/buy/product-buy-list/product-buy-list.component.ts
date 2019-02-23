import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';

import { ProductBuyListDto } from '../_interfaces/productBuyListDto';
import { ProductBuyService } from '../_services/product-buy.service';
import { ProductBuy } from '../_interfaces/product-buy';
import { CategoryBuy } from 'src/app/category/buy/_interfaces/categoryBuy';
import { CategoryBuyService } from 'src/app/category/buy/_services/category-buy.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { equal } from 'assert';

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
  dataSource = new MatTableDataSource([]);
  localSource = new MatTableDataSource([]);
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
  ) { }

  ngOnInit() {
    // TODO: Check route data return from edit before call API
    // this.getCategories();

    
  }

  ngAfterViewInit(): void {
    // TODO: Check route data return from edit before call API
    // this.getProductList();

    // *Check data return from edit component & update dataSource base on data return
    this.routeEditSub = this.route.paramMap.pipe(map(() => window.history.state))
      .subscribe(res => {
        // Cancel do nothing
        if (res.data === 0) {
          console.log(this.dataSource);
        } else if (res.data && res.data !== 0) {
          const index = this.dataSource.data.findIndex(p => p.productId === res.productId);

          // Product return from edit component exists on dataSource, so we update dataSource
          //  without calling API
          if (index > -1) {
            this.dataSource.data.splice(index, 1, res);
            this.dataSource._updateChangeSubscription();
          }
        // Edit component doesn't return any data, in this case we calling API to get dataSource
        } else {
          this.getProductList();
          this.getCategories();
        }
      });
  }

  refreshData() {

  }

  getCategories() {
    this.categoryBuyService.getCategoryList().subscribe(res => {
      this.categories = res;
    });
  }

  getProductList() {
    this.productBuyService.getProductList().subscribe(res => {
      // Check to loading progress bar
      this.isLoading = false;

      this.dataSource = new MatTableDataSource<ProductBuyListDto>(res);
      setTimeout(() => this.dataSource.sort = this.sort);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    }, () => this.isLoading = false);
  }

  onCreate() {
    // Send categories to edit component
    this.router.navigateByUrl('/product-buy/create', { state: { categories: this.categories } });
  }

  onDetail(productBuy: ProductBuy) {
    this.router.navigate(['product-buy', productBuy.productId]);
  }

  onEdit(productBuy: ProductBuy) {
    // Send current product, categories to edit component
    this.router.navigateByUrl(`/product-buy/edit/${productBuy.productId}`, { state: { product: productBuy, categories: this.categories } });
  }

  onDelete(productBuy: ProductBuy) {
    this.productBuyService.deleteProduct(productBuy.productId).subscribe(() => {
      // Get index of deleted row
      const index = this.dataSource.data.indexOf(productBuy, 0);
      // Remove row, update dataSource & remove all selection
      if (index > -1) {
        this.dataSource.data.splice(index, 1);
        this.dataSource._updateChangeSubscription();
        this.selection.clear();
      }
    });
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
        const textToSearch = (JSON.stringify(data) && JSON.stringify(data).toLowerCase()) || '';
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
