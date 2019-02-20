import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';

import { ProductSellListDto } from '../_interfaces/productSellListDto';
import { ProductSellService } from '../_services/product-sell.service';
import { ProductSell } from '../_interfaces/product-sell';
import { CategorySell } from 'src/app/category/sell/_interfaces/category-sell';
import { CategorySellService } from 'src/app/category/sell/_services/category-sell.service';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-product-sell-list',
  templateUrl: './product-sell-list.component.html',
  styleUrls: ['./product-sell-list.component.css'],
})
export class ProductSellListComponent implements OnInit, AfterViewInit {
  displayedColumns = [
    'select',
    'name',
    'specification',
    'price',
    'categoryName',
    'actions',
  ];
  dataSource = new MatTableDataSource<ProductSellListDto>([]);
  selection = new SelectionModel<ProductSellListDto>(true, []);
  paginator: MatPaginator;
  sort: MatSort;
  title = 'Products List';
  categories: CategorySell[];

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
    private productSellService: ProductSellService,
    private router: Router,
    private categorySellService: CategorySellService,
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
    this.categorySellService.getCategoryList().subscribe(res => {
      this.categories = res;
    });
  }

  getProductList() {
    this.productSellService.getProductList().subscribe(res => {
      this.dataSource = new MatTableDataSource<ProductSellListDto>(res);
    });
  }

  onDetail(productSell: ProductSell) {
    this.router.navigate(['product-sell', productSell.productId]);
  }

  onEdit(productSell: ProductSell) {
    this.router.navigate(['product-sell/edit', productSell.productId]);
  }

  onDelete(productSell: ProductSell) {
    this.productSellService.deleteProduct(productSell.productId);
    this.getProductList();
  }

  refreshData() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  // On input focus: setup filterPredicate to only filter by input column
  setupFilter(column: string) {
    this.dataSource.filterPredicate = (
      data: ProductSellListDto,
      filter: string,
    ) => {
      const textToSearch = (data[column] && data[column].toLowerCase()) || '';
      return textToSearch.indexOf(filter) !== -1;
    };
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
