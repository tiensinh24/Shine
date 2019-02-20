import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';

import { ProductBuyListDto } from '../_interfaces/productBuyListDto';
import { ProductBuyService } from '../_services/product-buy.service';
import { ProductBuy } from '../_interfaces/product-buy';
import { CategoryBuy } from 'src/app/category/buy/_interfaces/categoryBuy';
import { CategoryBuyService } from 'src/app/category/buy/_services/category-buy.service';

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
  selection = new SelectionModel<ProductBuyListDto>(true, []);
  paginator: MatPaginator;
  sort: MatSort;
  title = 'Products List';
  categories: CategoryBuy[];

  @ViewChild(MatPaginator) set appPa(paginator: MatPaginator) {
    this.paginator = paginator;
    setTimeout(() => (this.dataSource.paginator = this.paginator));
    // this.dataSource.paginator = this.paginator;
  }
  @ViewChild(MatSort) set appSo(sort: MatSort) {
    this.sort = sort;
    setTimeout(() => (this.dataSource.sort = this.sort));
    // this.dataSource.sort = this.sort;
  }

  constructor(
    private productBuyService: ProductBuyService,
    private router: Router,
    private categoryBuyService: CategoryBuyService,
  ) {}

  ngOnInit() {
    this.getProductList();
    this.getCategories();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getCategories() {
    this.categoryBuyService.getCategoryList().subscribe(res => {
      this.categories = res;
    });
  }

  getProductList() {
    this.productBuyService.getProductList().subscribe(res => {
      this.dataSource = new MatTableDataSource<ProductBuyListDto>(res);
    });
  }

  onDetail(productBuy: ProductBuy) {
    this.router.navigate(['product-buy', productBuy.productId]);
  }

  onEdit(productBuy: ProductBuy) {
    this.router.navigate(['product-buy/edit', productBuy.productId]);
  }

  onDelete(productBuy: ProductBuy) {
    this.productBuyService.deleteProduct(productBuy.productId);
    this.getProductList();
  }

  refreshData() {
    this.paginator._changePageSize(this.paginator.pageSize);
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
