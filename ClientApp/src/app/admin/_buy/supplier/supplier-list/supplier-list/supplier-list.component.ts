import { SupplierDataSource } from '../../_data-source/supplier-data-source';
import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { SupplierEditDialogComponent } from 'src/app/_shared/components/_buy/suppliers/supplier-edit-dialog/supplier-edit-dialog.component';
import { SupplierList } from 'src/app/_shared/intefaces/buy/supplier/supplier-list';
import { PagingParams } from 'src/app/_shared/intefaces/public/paging-params';
import { SortParams } from 'src/app/_shared/intefaces/public/sort-params';
import { SupplierService } from 'src/app/_shared/services/buy/supplier.service';
import { ConfirmDialogService } from 'src/app/_shared/services/public/confirm-dialog.service';
import { Supplier } from 'src/app/_shared/intefaces/buy/supplier/supplier';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit, AfterViewInit {
  dataSource: SupplierDataSource;
  displayedColumns = [
    { key: 'select', value: 'Select' },
    { key: 'photo', value: 'Photo' },
    { key: 'personNumber', value: 'Person Number' },
    { key: 'gender', value: 'Gender' },
    { key: 'fullName', value: 'Full Name' },
    { key: 'dateOfBirth', value: 'Birthday' },
    { key: 'telephone', value: 'Telephone' },
    
    { key: 'countryName', value: 'Country' },
    { key: 'continentName', value: 'Continent' },
    {key: 'email', value: 'Email'},
    {key: 'address', value: 'Address'},
    { key: 'rating', value: 'Rating' },
    { key: 'actions', value: 'Actions' }
  ];
  columnsToDisplay = [
    'select',
    'photo',
    'personNumber',
    'gender',
    'fullName',
    'dateOfBirth',
    'telephone',    
    'countryName',
    'continentName',
    'email',
    'address',
    'rating',
    'actions'
  ];
  selection = new SelectionModel<SupplierList>(true, []);
  numRows: number;

  title = 'Suppliers List';

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild('input', { static: true }) input: ElementRef;

  pagingParams = <PagingParams>{
    pageIndex: 0,
    pageSize: 8
  };

  sortParams = <SortParams>{
    sortColumn: '',
    sortOrder: ''
  };

  constructor(
    private supplierService: SupplierService,
    private router: Router,
    private dialog: MatDialog,
    private confirmService: ConfirmDialogService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.dataSource = new SupplierDataSource(this.supplierService);
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
          this.loadSuppliersPage();
        })
      )
      .subscribe();

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    // on sort or paginate events, load a new page
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => {
          this.loadSuppliersPage();
          setTimeout(() => this.selection.clear(), 50);
        })
      )
      .subscribe();
  }

  loadSuppliersPage() {
    this.pagingParams.pageIndex = this.paginator.pageIndex;
    this.pagingParams.pageSize = this.paginator.pageSize;

    this.sortParams.sortColumn = this.sort.active;
    this.sortParams.sortOrder = this.sort.direction;

    const filter = this.input.nativeElement.value;

    this.dataSource.loadData(this.pagingParams, this.sortParams, filter);
  }

  onCreate() {
    this.router.navigate(['/admin/supplier/create']);
  }

  onEdit(supplier: Supplier) {
    this.router.navigate([`/admin/supplier/${supplier.personId}/edit`]);
  }

  onDelete(supplier: Supplier) {
    const dialogRef = this.confirmService.openDialog(`Are you sure to delete ${supplier.firstName} ${supplier.lastName}?`);

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.supplierService.deleteSupplier(supplier.personId).subscribe(() => {
          this.loadSuppliersPage();
          this.snackBar.open(`${supplier.firstName} ${supplier.lastName} deleted`, 'Success');
          setTimeout(() => this.selection.clear(), 50);
        });
      }
    });
  }

  onDeleteSelected() {
    let suppliers: SupplierList[];
    const suppliersToDelete: string[] = [];
    this.dataSource.data.subscribe(data => (suppliers = data));

    const dialogRef = this.confirmService.openDialog(`Are you sure to delete those suppliers`);

    dialogRef.afterClosed().subscribe((res: boolean) => {
      if (res) {
        suppliers.forEach(supplier => {
          if (this.selection.isSelected(supplier)) {
            suppliersToDelete.push(supplier.personId.toString());
          }
        });
        this.supplierService.deleteSuppliers(suppliersToDelete).subscribe((resp: boolean) => {
          if (resp) {
            this.loadSuppliersPage();
            this.snackBar.open('Supplier deleted', 'Success');
          } else {
            this.snackBar.open('Can not delete suppliers', 'Error');
          }
          setTimeout(() => this.selection.clear(), 50);
        });
      }
    });
  }

  // Open supplier-edit-dialog
  openDialog(supplierId?: number) {
    // Find supplier in dataSource
    let supplierEdit: SupplierList = null;

    this.dataSource.data.subscribe(res => {
      supplierEdit = res.find(c => c.personId === supplierId);
    });

    const dialogConfig = <MatDialogConfig>{
      disableClose: true,
      autoFocus: true,
      maxWidth: '100vw',
      maxHeight: '100vh',
      width: '800px',
      height: '495px',
      panelClass: 'custom-dialog'
    };

    // Send data to supplier edit component
    if (supplierEdit) {
      dialogConfig.data = {
        personId: supplierEdit.personId,
        personNumber: supplierEdit.personNumber,
        gender: supplierEdit.gender,
        firstName: supplierEdit.firstName,
        lastName: supplierEdit.lastName,
        fullName: supplierEdit.fullName,
        dateOfBirth: supplierEdit.dateOfBirth,
        telephone: supplierEdit.telephone,
        fax: supplierEdit.fax,
        countryId: supplierEdit.countryId
      };
    }

    // Open dialog with config & passed data
    const dialogRef = this.dialog.open(SupplierEditDialogComponent, dialogConfig);

    // Pass data from dialog in to main component
    dialogRef.afterClosed().subscribe((data: SupplierList) => {
      if (data) {
        this.loadSuppliersPage();
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

  clearFilter() {
    this.input.nativeElement.value = null;
    this.loadSuppliersPage();
  }
}
