import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';

import { CategoryBuyDataSource } from '../_dataSource/category-buy-data-source';
import { CategoryBuyService } from '../_services/category-buy.service';
import { PagingParams } from 'src/app/_shared/_intefaces/paging-params';
import { SortParams } from 'src/app/_shared/_intefaces/sort-params';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { merge } from 'rxjs';

@Component({
  selector: 'app-category-buy-custom-list',
  templateUrl: './category-buy-custom-list.component.html',
  styleUrls: ['./category-buy-custom-list.component.css'],
})
export class CategoryBuyCustomListComponent implements OnInit, AfterViewInit {
  dataSource: CategoryBuyDataSource;
  displayedColumns = ['categoryId', 'categoryName'];

  pagingParams = <PagingParams>{
    pageIndex: 0,
    pageSize: 8,
  };

  sortParams = <SortParams>{
    sortColumn: '',
    sortOrder: '',
  };

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private categoryBuyService: CategoryBuyService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.dataSource = new CategoryBuyDataSource(this.categoryBuyService);
    this.dataSource.loadCategories(this.pagingParams, this.sortParams);
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadCategoriesPage()))
      .subscribe();
  }

  loadCategoriesPage() {
    this.pagingParams.pageIndex = this.paginator.pageIndex;
    this.pagingParams.pageSize = this.paginator.pageSize;

    this.sortParams.sortColumn = this.sort.active;
    this.sortParams.sortOrder = this.sort.direction;

    this.dataSource.loadCategories(this.pagingParams, this.sortParams);
  }
}
