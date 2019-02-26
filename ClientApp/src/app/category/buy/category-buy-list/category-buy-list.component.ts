import { Component, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import {
  MatTableDataSource,
  MatSort,
  MatPaginator,
  MatDialog,
  MatDialogConfig,
} from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { CategoryBuy } from '../_interfaces/categoryBuy';
import { CategoryBuyService } from '../_services/category-buy.service';
import { CategoryBuyDialogComponent } from 'src/app/_shared/components/category-buy-dialog/category-buy-dialog.component';

@Component({
  selector: 'app-category-buy-list',
  templateUrl: './category-buy-list.component.html',
  styleUrls: ['./category-buy-list.component.css'],
})
export class CategoryBuyListComponent implements AfterViewInit, OnDestroy {
  displayedColumns = ['select', 'categoryId', 'categoryName', 'actions'];
  dataSource = new MatTableDataSource<CategoryBuy>([]);
  selection = new SelectionModel<CategoryBuy>(true, []);
  isLoading = true;
  isEdit: boolean;
  title = 'Category List';
  catsSub: Subscription;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private categoryBuyService: CategoryBuyService,
    private router: Router,
    private dialog: MatDialog,
  ) {}

  ngAfterViewInit(): void {
    this.getCategoryList();
  }

  ngOnDestroy(): void {
    this.catsSub.unsubscribe();
  }

  getCategoryList() {
    this.catsSub = this.categoryBuyService.getCategoryList().subscribe(
      res => {
        // Check to loading progress bar
        this.isLoading = false;

        this.dataSource = new MatTableDataSource<CategoryBuy>(res);
        setTimeout(() => (this.dataSource.sort = this.sort));
        setTimeout(() => (this.dataSource.paginator = this.paginator));
      },
      () => (this.isLoading = false),
    );
  }

  onDetail(categoryBuy: CategoryBuy) {
    this.router.navigate(['category-buy', categoryBuy.categoryId]);
  }

  onEdit(categoryBuy: CategoryBuy) {
    this.openDialog(categoryBuy.categoryId);
  }

  onDelete(categoryBuy: CategoryBuy) {
    this.categoryBuyService
      .deleteCategory(categoryBuy.categoryId)
      .subscribe(() => {
        // Get index of deleted row
        const index = this.dataSource.data.indexOf(categoryBuy, 0);
        // Remove row, update dataSource & remove all selection
        if (index > -1) {
          this.dataSource.data.splice(index, 1);
          this.dataSource._updateChangeSubscription();
          this.selection.clear();
        }
      });
  }

  openDialog(categoryId?: number) {
    // Find category in dataSource
    const catEdit = this.dataSource.data.find(c => c.categoryId === categoryId);

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    // Width & height
    dialogConfig.maxWidth = '100vw';
    dialogConfig.maxHeight = '100vh';
    dialogConfig.width = '80%';
    dialogConfig.height = '80%';

    // Send data to category edit component
    if (catEdit) {
      dialogConfig.data = {
        categoryId: catEdit.categoryId,
        categoryName: catEdit.categoryName,
      };
    }

    // Open dialog with config & passed data
    const dialogRef = this.dialog.open(
      CategoryBuyDialogComponent,
      dialogConfig,
    );

    // Pass data from dialog in to main component
    dialogRef.afterClosed().subscribe((data: CategoryBuy) => {
      // Check if data exists
      if (data) {
        // Create mode
        if (!catEdit) {
          this.categoryBuyService
            .addCategory(data)
            .subscribe((res: CategoryBuy) => {
              // Add new category into data source
              this.dataSource.data.push(res);
              // Update data source
              this.dataSource._updateChangeSubscription();
            });
          // Edit mode
        } else {
          this.categoryBuyService
            .updateCategory(data)
            .subscribe((res: CategoryBuy) => {
              const index = this.dataSource.data.findIndex(
                c => c.categoryId === res.categoryId,
              );
              this.dataSource.data.splice(index, 1, res);
              this.dataSource._updateChangeSubscription();
            });
        }
      }
      this.selection.clear();
    });
  }

  // On input focus: setup filterPredicate to only filter by input column
  setupFilter(column?: string) {
    // Only filter specify column
    if (column.length > 0) {
      this.dataSource.filterPredicate = (data: CategoryBuy, filter: string) => {
        const textToSearch = (data[column] && data[column].toLowerCase()) || '';
        return textToSearch.indexOf(filter) !== -1;
      };
    } else {
      // If column = '', filter on all column
      this.dataSource.filterPredicate = (data: CategoryBuy, filter: string) => {
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
