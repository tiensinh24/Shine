import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';

import { CategoryBuy } from '../_interfaces/categoryBuy';
import { CategoryBuyService } from '../_services/category-buy.service';

@Component({
  selector: 'app-category-buy-list',
  templateUrl: './category-buy-list.component.html',
  styleUrls: ['./category-buy-list.component.css']
})
export class CategoryBuyListComponent implements AfterViewInit {
  displayedColumns = [
    'select',
    'categoryId',
    'categoryName',
    'actions',
  ];
  dataSource = new MatTableDataSource([]);
  selection = new SelectionModel<CategoryBuy>(true, []);
  isLoading = true;
  title = 'Category List';

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private categoryBuyService: CategoryBuyService,
    private router: Router,
  ) { }

  ngAfterViewInit(): void {
    this.getCategoryList();
  }

  getCategoryList() {
    this.categoryBuyService.getCategoryList().subscribe(res => {
      // Check to loading progress bar
      this.isLoading = false;

      this.dataSource = new MatTableDataSource<CategoryBuy>(res);
      setTimeout(() => this.dataSource.sort = this.sort);
      setTimeout(() => this.dataSource.paginator = this.paginator);
    }, () => this.isLoading = false);
  }

  onDetail(categoryBuy: CategoryBuy) {
    this.router.navigate(['category-buy', categoryBuy.categoryId]);
  }

  onEdit(categoryBuy: CategoryBuy) {
    this.router.navigate(['category-buy/edit', categoryBuy.categoryId]);
  }

  onDelete(categoryBuy: CategoryBuy) {
    this.categoryBuyService.deleteCategory(categoryBuy.categoryId);
    this.getCategoryList();
  }

  refreshData() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  // On input focus: setup filterPredicate to only filter by input column
  setupFilter(column?: string) {
    // Only filter specify column
    if (column.length > 0) {
      this.dataSource.filterPredicate = (
        data: CategoryBuy,
        filter: string,
      ) => {
        const textToSearch = (data[column] && data[column].toLowerCase()) || '';
        return textToSearch.indexOf(filter) !== -1;
      };
    } else {
      // If column = '', filter on all column
      this.dataSource.filterPredicate = (
        data: CategoryBuy,
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
