import { Component, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import {
  MatTableDataSource,
  MatSort,
  MatPaginator,
  MatDialog,
  MatDialogConfig,
} from '@angular/material';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { Subscription } from 'rxjs';

import { SupplierDto } from '../_interfaces/supplierDto';
import { SupplierService } from '../_services/supplier.service';
import { Supplier } from '../_interfaces/supplier';
import { SupplierEditDialogComponent } from 'src/app/_shared/components/supplier-edit-dialog/supplier-edit-dialog.component';
import { Country } from 'src/app/country/_interfaces/country';
import { CountryService } from 'src/app/country/_services/country.service';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css'],
})
export class SupplierListComponent implements AfterViewInit, OnDestroy {
  displayedColumns = [
    'select',
    'personNumber',
    'gender',
    'firstName',
    'lastName',
    'dateOfBirth',
    'telephone',
    'fax',
    // 'countryId',
    'countryName',
    'continentName',
    'actions',
  ];
  dataSource = new MatTableDataSource<SupplierDto>([]);
  selection = new SelectionModel<SupplierDto>(true, []);
  isLoading = true;
  title = 'Supplier List';
  countries: Country[];
  sub: Subscription;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private supplierService: SupplierService,
    private countryService: CountryService,
    private router: Router,
    private dialog: MatDialog,
  ) {}

  ngAfterViewInit(): void {
    this.getSupplierList();
    this.getCountries();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getCountries() {
    this.sub = this.countryService.getCountryList().subscribe(res => {
      this.countries = res;
    });
  }

  getSupplierList() {
    this.sub = this.supplierService.getSupplierList().subscribe(
      res => {
        // Check to loading progress bar
        this.isLoading = false;

        this.dataSource = new MatTableDataSource<SupplierDto>(res);
        setTimeout(() => (this.dataSource.sort = this.sort));
        setTimeout(() => (this.dataSource.paginator = this.paginator));
      },
      () => (this.isLoading = false),
    );
  }

  onCreate() {
    this.openDialog(0);
  }

  onDetail(supplier: Supplier) {
    this.router.navigate(['supplier', supplier.personId]);
  }

  onEdit(supplier: Supplier) {
    this.openDialog(supplier.personId);
  }

  onDelete(supplier: Supplier) {
    this.supplierService.deleteSupplier(supplier.personId).subscribe(() => {
      // Get index of deleted row
      const index = this.dataSource.data.indexOf(<SupplierDto>supplier, 0);
      // Remove row, update dataSource & remove all selection
      if (index > -1) {
        this.dataSource.data.splice(index, 1);
        this.dataSource._updateChangeSubscription();
        this.selection.clear();
      }
    });
  }

  // Open supplier-edit dialog
  openDialog(personId?: number) {
    const supplierEdit = this.dataSource.data.find(
      s => s.personId === personId,
    );

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    // Width & height
    dialogConfig.maxWidth = '100vw';
    dialogConfig.maxHeight = '100vh';
    dialogConfig.minWidth = '100%';
    dialogConfig.height = '100%';

    // Send data to supplier edit dialog component
    if (supplierEdit) {
      dialogConfig.data = {
        personId: supplierEdit.personId,
        personNumber: supplierEdit.personNumber,
        gender: supplierEdit.gender,
        firstName: supplierEdit.firstName,
        lastName: supplierEdit.lastName,
        dateOfBirth: supplierEdit.dateOfBirth,
        telephone: supplierEdit.telephone,
        fax: supplierEdit.fax,
        countryId: supplierEdit.countryId,
      };
    } else {
      dialogConfig.data = {
        // categories: this.countries,
      };
    }

    const dialogRef = this.dialog.open(
      SupplierEditDialogComponent,
      dialogConfig,
    );

    // Get data returned from supplier-edit dialog
    dialogRef.afterClosed().subscribe((res: SupplierDto) => {
      // Check if res exists
      if (res) {
        const index = this.dataSource.data.findIndex(
          s => s.personId === res.personId,
        );

        // Check if data returned is an updated supplier or a new one
        if (index > -1) {
          // Update dataSource
          this.dataSource.data.splice(index, 1, res);
          this.dataSource._updateChangeSubscription();
        } else {
          // Add new supplier to dataSource
          this.dataSource.data.push(res);
          this.dataSource._updateChangeSubscription();
        }
      }
      this.selection.clear();
    });
  }

  // On input focus: setup filterPredicate to only filter by input column
  setupFilter(column?: string) {
    // Only filter specify column
    if (column.length > 0) {
      this.dataSource.filterPredicate = (data: SupplierDto, filter: string) => {
        const textToSearch = (data[column] && data[column].toLowerCase()) || '';
        return textToSearch.indexOf(filter) !== -1;
      };
    } else {
      // If column = '', filter on all column
      this.dataSource.filterPredicate = (data: SupplierDto, filter: string) => {
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
