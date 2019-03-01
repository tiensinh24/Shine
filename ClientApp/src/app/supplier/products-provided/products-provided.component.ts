import { Component, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogConfig } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Subscription } from 'rxjs';

import { SupplierService } from '../_services/supplier.service';
import { SupplierProductsDto } from '../_interfaces/supplierProductsDto';
import { Supplier } from '../_interfaces/supplier';
import { SupplierProduct } from '../_interfaces/supplierProduct';
import { ProductsProvidedDialogComponent } from 'src/app/_shared/components/products-provided-dialog/products-provided-dialog.component';

export interface TableCol {
  header: string;
  value: string;
}

@Component({
  selector: 'app-products-provided',
  templateUrl: './products-provided.component.html',
  styleUrls: ['./products-provided.component.css']
})
export class ProductsProvidedComponent implements AfterViewInit, OnDestroy {
  displayedColumns = [
    'select',
    'fullName',
    'age',
    'productName',
    'specification',
    'actions'
  ];
  columnsToDisplay: TableCol[] = [
    { header: 'Full Name', value: 'fullName' },
    { header: 'Age', value: 'age' },
    { header: 'Product Name', value: 'productName' },
    { header: 'Specification', value: 'specification' },
  ];

  dataSource = new MatTableDataSource<SupplierProductsDto>([]);
  selection = new SelectionModel<SupplierProductsDto>(true, []);
  isLoading = true;
  title = `Products List`;
  suppliers: Supplier[];
  sub: Subscription;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private supplierService: SupplierService,
    private dialog: MatDialog,
  ) {}

  ngAfterViewInit(): void {
    this.getProductsProvided();
    this.getSuppliers();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getSuppliers() {
    this.sub = this.supplierService.getSupplierList().subscribe(res => {
      this.suppliers = res;
    });
  }

  getProductsProvided() {
    this.sub = this.supplierService.getSupplierProducts().subscribe(
      res => {
        this.isLoading = false;

        this.dataSource = new MatTableDataSource<SupplierProductsDto>(res);
        setTimeout(() => (this.dataSource.sort = this.sort));
        setTimeout(() => (this.dataSource.paginator = this.paginator));
      },
      () => (this.isLoading = false),
    );
  }

  onCreate() {
    this.addProductsProvided(0);
  }

  onDelete(supprod: SupplierProduct) {
    this.supplierService.deleteSupplierProduct(supprod).subscribe(() => {
      // Get index of deleted row
      const index = this.dataSource.data.indexOf(<SupplierProductsDto>supprod, 0);
      // Remove row, update dataSource & remove all selection
      if (index > -1) {
        this.dataSource.data.splice(index, 1);
        this.dataSource._updateChangeSubscription();
        this.selection.clear();
      }
    });
  }

  addProductsProvided(supplierId: number) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    // Width & height
    dialogConfig.maxWidth = '100vw';
    dialogConfig.maxHeight = '100vh';
    dialogConfig.minWidth = '100%';
    dialogConfig.height = '100%';

    dialogConfig.data = {
      personId: supplierId
    };

    const dialogRef = this.dialog.open(
      ProductsProvidedDialogComponent,
      dialogConfig,
    );

    dialogRef.afterClosed().subscribe((res: SupplierProductsDto) => {
      // Check if res exists
      if (res) {

        // TODO: get from API
          // Add new product to dataSource
          this.dataSource.data.push(res);
          this.dataSource._updateChangeSubscription();

          this.selection.clear();
        }
      });
    }

  // On input focus: setup filterPredicate to only filter by input column
  setupFilter(column?: string) {
    // Only filter specify column
    if (column.length > 0) {
      this.dataSource.filterPredicate = (
        data: SupplierProductsDto,
        filter: string,
      ) => {
        const textToSearch = (data[column] && data[column].toLowerCase()) || '';
        return textToSearch.indexOf(filter) !== -1;
      };
    } else {
      // If column = '', filter on all column
      this.dataSource.filterPredicate = (
        data: SupplierProductsDto,
        filter: string,
      ) => {
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
