import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { merge, fromEvent } from 'rxjs';

import { CategoryBuyDataSource } from '../_dataSource/category-buy-data-source';
import { CategoryBuyService } from '../_services/category-buy.service';
import { PagingParams } from 'src/app/_shared/_intefaces/paging-params';
import { SortParams } from 'src/app/_shared/_intefaces/sort-params';

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
  @ViewChild('input') input: ElementRef;

  constructor(private categoryBuyService: CategoryBuyService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.dataSource = new CategoryBuyDataSource(this.categoryBuyService);
    this.dataSource.loadCategories(this.pagingParams, this.sortParams);
  }

  ngAfterViewInit(): void {
    // Server-side search
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(250),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadCategoriesPage();
        }),
      )
      .subscribe();

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    // on sort or paginate events, load a new page
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadCategoriesPage()))
      .subscribe();
  }

  loadCategoriesPage() {
    this.pagingParams.pageIndex = this.paginator.pageIndex;
    this.pagingParams.pageSize = this.paginator.pageSize;

    this.sortParams.sortColumn = this.sort.active;
    this.sortParams.sortOrder = this.sort.direction;

    const filter = this.input.nativeElement.value;

    this.dataSource.loadCategories(this.pagingParams, this.sortParams, filter);
  }
}
