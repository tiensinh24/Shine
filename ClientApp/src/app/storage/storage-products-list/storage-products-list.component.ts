import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatSnackBar, MatSort } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEvent, merge, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { PagingParams } from 'src/app/_shared/_intefaces/paging-params';
import { SortParams } from 'src/app/_shared/_intefaces/sort-params';
import { ConfirmDialogService } from 'src/app/_shared/_services/confirm-dialog.service';
import { StorageProductsDataSource } from '../_data-source/storage-products-data-source';
import { StorageProductEditDialogComponent } from '../_dialogs/storage-product-edit-dialog/storage-product-edit-dialog.component';
import { StorageProduct } from '../_interfaces/storage-product';
import { StorageProductsList } from '../_interfaces/storage-products-list';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-storage-products-list',
  templateUrl: './storage-products-list.component.html',
  styleUrls: ['./storage-products-list.component.scss']
})
export class StorageProductsListComponent implements OnInit, AfterViewInit, OnDestroy {
  dataSource: StorageProductsDataSource;
  displayedColumns = ['select', 'date', 'productName', 'quantity', 'type', 'fromTo', 'actions'];
  selection = new SelectionModel<StorageProductsList>(true, [], false);

  storageId = +this.route.snapshot.params.storageId;
  subscription = new Subscription();

  title = 'Product Import/Export Lists';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  pagingParams = <PagingParams>{
    pageIndex: 0,
    pageSize: 8
  };

  sortParams = <SortParams>{
    sortColumn: '',
    sortOrder: ''
  };

  constructor(
    private storageService: StorageService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private confirmService: ConfirmDialogService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.dataSource = new StorageProductsDataSource(this.storageService);
    this.dataSource.loadData(this.storageId, this.pagingParams, this.sortParams);
  }

  ngAfterViewInit(): void {
    // Server-side search
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(250),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadStorageProductsPage();
        })
      )
      .subscribe();

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    // on sort or paginate events, load a new page
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => {
          this.loadStorageProductsPage();
          setTimeout(() => this.selection.clear(), 50);
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadStorageProductsPage() {
    this.pagingParams.pageIndex = this.paginator.pageIndex;
    this.pagingParams.pageSize = this.paginator.pageSize;

    this.sortParams.sortColumn = this.sort.active;
    this.sortParams.sortOrder = this.sort.direction;

    const filter = this.input.nativeElement.value;

    this.dataSource.loadData(this.storageId, this.pagingParams, this.sortParams, filter);
  }

  onEdit(item: StorageProduct) {
    this.openDialog(item.id);
  }

  onDelete(item: StorageProduct) {
    const dialogRef = this.confirmService.openDialog(`Are you sure to delete this information?`);

    dialogRef.afterClosed().subscribe((res: boolean) => {
      if (res) {
        this.storageService.deleteStorageProduct(item.storageId, item.id).subscribe(() => {
          this.loadStorageProductsPage();

          if (item.type) {
            this.snackBar.open(`Import information has been deleted`, 'Success');
          } else {
            this.snackBar.open(`Export information has been deleted`, 'Success');
          }
          setTimeout(() => this.selection.clear(), 50);
        });
      }
    });
  }

  onDeleteSelected() {
    let data: StorageProductsList[];
    const itemsToDelete: string[] = [];

    this.subscription = this.dataSource.data.subscribe(res => (data = res));

    const dialogRef = this.confirmService.openDialog(`Are you sure to delete all the selected rows?`);

    dialogRef.afterClosed().subscribe((res: boolean) => {
      if (res) {
        data.forEach(item => {
          if (this.selection.isSelected(item)) {
            itemsToDelete.push(item.id.toString());
          }
        });
        this.storageService.deleteStorageProducts(this.storageId, itemsToDelete).subscribe((resp: boolean) => {
          if (resp) {
            this.loadStorageProductsPage();
            this.snackBar.open('Import/Export information has been deleted', 'Success');
          } else {
            this.snackBar.open('Can not delete informations', 'Error');
          }
          setTimeout(() => this.selection.clear(), 50);
        });
      }
    });
  }

  // Open storage-products-edit-dialog
  openDialog(id: string) {
    // Find product in dataSource
    let itemEdit: StorageProductsList = null;

    this.dataSource.data.subscribe(res => {
      itemEdit = res.find(c => c.id === id);
    });

    const dialogConfig = <MatDialogConfig>{
      disableClose: true,
      autoFocus: true,
      maxWidth: '100vw',
      maxHeight: '100vh',
      width: '800px',
      height: '610px',
      panelClass: 'custom-dialog'
    };

    dialogConfig.data = {
      id: itemEdit.id,
      storageId: itemEdit.storageId,
      productId: itemEdit.productId,
      productName: itemEdit.productName,
      date: itemEdit.date,
      quantity: itemEdit.quantity,
      type: itemEdit.type,
      fromTo: itemEdit.fromTo
    };

    // Open dialog with config & passed data
    const dialogRef = this.dialog.open(StorageProductEditDialogComponent, dialogConfig);

    // Pass data from dialog in to main component
    dialogRef.afterClosed().subscribe((data: StorageProduct) => {
      if (data) {
        this.loadStorageProductsPage();
      }

      this.selection.clear();
    });
  }

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

  goToAddImport() {
    this.router.navigate([`/storage/${this.storageId}/add-import`]);
  }
}
