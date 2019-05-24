import { HttpResponse } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';
import { ProductSelect } from 'src/app/product/_interfaces/product-select';
import { ProductService } from 'src/app/product/_services/product.service';
import { StorageProductsList } from '../../_interfaces/storage-products-list';
import { StorageService } from '../../_services/storage.service';

@Component({
  selector: 'app-storage-add-import',
  templateUrl: './storage-add-import.component.html',
  styleUrls: ['./storage-add-import.component.scss']
})
export class StorageAddImportComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  productsSelect: ProductSelect[];

  formGroup: FormGroup;
  importTable: StorageProductsList[] = [];
  tableSource: MatTableDataSource<StorageProductsList>;

  // Input
  @Input() storageId: number;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private storageService: StorageService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.createForm();
    this.getProducts();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  createForm() {
    this.formGroup = this.fb.group({
      product: ['', Validators.required],
      date: ['', [Validators.required]],
      quantity: ['', Validators.required],
      type: [true]
    });
  }

  getProducts() {
    this.subscription = this.productService.getProductsSelect().subscribe((products: ProductSelect[]) => {
      this.productsSelect = products;
    });
  }

  addToTable() {
    const ixport = <StorageProductsList>{
      storageId: this.storageId,
      productId: this.formGroup.value.product.productId,
      productName: this.formGroup.value.product.productName,
      date: this.formGroup.value.date,
      quantity: this.formGroup.value.quantity,
      type: this.formGroup.value.type
    };

    // Update tableSource
    if (this.formGroup.valid) {
      // Check if item already exist on table
      const index = this.importTable.findIndex(
        s =>
          s.storageId === ixport.storageId &&
          s.productId === ixport.productId &&
          s.date === ixport.date &&
          s.type === ixport.type
      );
      if (index === -1) {
        this.importTable.push(ixport);
        this.tableSource = new MatTableDataSource(this.importTable);
      } else {
        this.snackBar.open('Item already added', 'warning');
      }
    }
  }

  removeFromTable(item: StorageProductsList) {
    const index = this.importTable.findIndex(
      s =>
        s.storageId === item.storageId && s.productId === item.productId && s.date === item.date && s.type === item.type
    );

    this.importTable.splice(index, 1);
    this.tableSource = new MatTableDataSource(this.importTable);
  }

  submit() {
    this.subscription = this.storageService.addStorageProducts(this.importTable).subscribe(
      (res: HttpResponse<any>) => {
        if (res.ok) {
          this.snackBar.open('Products has been import/export', 'Success');
        }
      },
      error => {
        this.snackBar.open(error, 'Error');
      }
    );
  }
}
