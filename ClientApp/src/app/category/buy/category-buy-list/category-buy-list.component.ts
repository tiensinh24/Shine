import { CategoryBuyDataSource } from '../_data-source/category-buy-data-source';
import { CategoryBuy } from '../_interfaces/category-buy';
import { CategoryBuyService } from '../_services/category-buy.service';
import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild
  } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { PagingParams } from 'src/app/_shared/_intefaces/paging-params';
import { SortParams } from 'src/app/_shared/_intefaces/sort-params';
import { ConfirmDialogService } from 'src/app/_shared/_services/confirm-dialog.service';
import { CategoryBuyDialogComponent } from 'src/app/_shared/components/_buy/categories/category-buy-dialog/category-buy-dialog.component';



@Component({
  selector: 'app-category-buy-list',
  templateUrl: './category-buy-list.component.html',
  styleUrls: ['./category-buy-list.component.css']
})
export class CategoryBuyListComponent implements OnInit, AfterViewInit {
  dataSource: CategoryBuyDataSource;
  displayedColumns = ['select', 'categoryId', 'categoryName', 'actions'];
  selection = new SelectionModel<CategoryBuy>(true, []);
  numRows: number;
  title = 'Categories List';

  pagingParams = <PagingParams>{
    pageIndex: 0,
    pageSize: 8
  };
  sortParams = <SortParams>{
    sortColumn: '',
    sortOrder: ''
  };

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild('input', { static: true }) input: ElementRef;

  constructor(
    private categoryBuyService: CategoryBuyService,
    private router: Router,
    private dialog: MatDialog,
    private confirmService: ConfirmDialogService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.dataSource = new CategoryBuyDataSource(this.categoryBuyService);
    this.dataSource.loadData(this.pagingParams, this.sortParams);
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
        })
      )
      .subscribe();

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    // on sort or paginate events, load a new page
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => {
          this.loadCategoriesPage();
          setTimeout(() => this.selection.clear(), 50);
        })
      )
      .subscribe();
  }

  loadCategoriesPage() {
    this.pagingParams.pageIndex = this.paginator.pageIndex;
    this.pagingParams.pageSize = this.paginator.pageSize;

    this.sortParams.sortColumn = this.sort.active;
    this.sortParams.sortOrder = this.sort.direction;

    const filter = this.input.nativeElement.value;

    this.dataSource.loadData(this.pagingParams, this.sortParams, filter);
  }

  onDetail(categoryBuy: CategoryBuy) {
    this.router.navigate(['category-buy', categoryBuy.categoryId]);
  }

  onEdit(categoryBuy: CategoryBuy) {
    this.openDialog(categoryBuy.categoryId);
  }

  onDelete(categoryBuy: CategoryBuy) {
    const dialogRef = this.confirmService.openDialog(`Are you sure to delete ${categoryBuy.categoryName}?`);

    dialogRef.afterClosed().subscribe((res: boolean) => {
      if (res) {
        this.categoryBuyService.deleteCategory(categoryBuy.categoryId).subscribe(() => {
          this.loadCategoriesPage();
          this.snackBar.open(`${categoryBuy.categoryName} deleted`, 'Success');
          setTimeout(() => this.selection.clear(), 50);
        });
      }
    });
  }

  onDeleteSeleted() {
    let categories: CategoryBuy[];
    const categoriesToDelete: string[] = [];
    this.dataSource.data.subscribe(data => (categories = data));

    const dialogRef = this.confirmService.openDialog(`Are you sure to delete those categories?`);

    dialogRef.afterClosed().subscribe((res: boolean) => {
      if (res) {
        categories.forEach(category => {
          if (this.selection.isSelected(category)) {
            categoriesToDelete.push(category.categoryId.toString());
          }
        });
        this.categoryBuyService.deleteCategories(categoriesToDelete).subscribe((resp: boolean) => {
          if (resp) {
            this.loadCategoriesPage();
            this.snackBar.open('Categories deleted', 'Success');
          } else {
            this.snackBar.open(`Can not delete categories`, 'Error');
          }
          setTimeout(() => this.selection.clear(), 50);
        });
      }
    });
  }

  // Open category-edit-dialog
  openDialog(categoryId?: number) {
    // Find category in dataSource
    let catEdit: CategoryBuy = null;

    this.dataSource.data.subscribe(res => {
      catEdit = res.find(c => c.categoryId === categoryId);
    });

    const dialogConfig = <MatDialogConfig>{
      disableClose: true,
      autoFocus: true,
      width: '500px',
      height: '320px'
    };

    // Send data to category edit component
    if (catEdit) {
      dialogConfig.data = {
        categoryId: catEdit.categoryId,
        categoryName: catEdit.categoryName
      };
    }

    // Open dialog with config & passed data
    const dialogRef = this.dialog.open(CategoryBuyDialogComponent, dialogConfig);

    // Pass data from dialog in to main component
    dialogRef.afterClosed().subscribe((data: CategoryBuy) => {
      if (data) {
        if (!catEdit) {
          this.categoryBuyService.addCategory(data).subscribe(() => this.loadCategoriesPage());
        } else {
          this.categoryBuyService.updateCategory(data).subscribe(() => this.loadCategoriesPage());
        }
      }
      this.selection.clear();
    });
  }

  // Whether the number of selected elements matches the total number of rows
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
}
