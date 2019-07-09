import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { ProductSell } from '../../../../_shared/intefaces/sell/product/product-sell';
import { ProductSellDto } from '../../../../_shared/intefaces/sell/product/product-sell-dto';
import { ProductSellService } from '../../../../_shared/services/sell/product-sell.service';
import { CategorySell } from 'src/app/_shared/intefaces/sell/category/category-sell';
import { CategorySellService } from 'src/app/_shared/services/sell/category-sell.service';

@Component({
  selector: 'app-product-sell-list',
  templateUrl: './product-sell-list.component.html',
  styleUrls: ['./product-sell-list.component.css']
})
export class ProductSellListComponent implements OnInit, AfterViewInit {
  displayedColumns = ['select', 'name', 'specification', 'categoryName', 'actions'];
  dataSource = new MatTableDataSource<ProductSellDto>([]);
  isLoading = true;
  selection = new SelectionModel<ProductSellDto>(true, []);
  title = 'Products List';
  categories: CategorySell[];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private productSellService: ProductSellService, private router: Router, private categorySellService: CategorySellService) {}

  ngOnInit() {
    this.getCategories();
  }

  ngAfterViewInit(): void {
    this.getProductList();
  }

  getCategories() {
    this.categorySellService.getCategoryList().subscribe(res => {
      this.categories = res;
    });
  }

  getProductList() {
    this.productSellService.getProductList().subscribe(
      res => {
        // Check to loading progress bar
        this.isLoading = false;

        this.dataSource = new MatTableDataSource<ProductSellDto>(res);
        setTimeout(() => (this.dataSource.sort = this.sort));
        setTimeout(() => (this.dataSource.paginator = this.paginator));
      },
      () => (this.isLoading = false)
    );
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
    this.dataSource.filterPredicate = (data: ProductSellDto, filter: string) => {
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
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
  }
}
