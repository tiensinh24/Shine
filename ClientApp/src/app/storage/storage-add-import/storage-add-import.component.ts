import { HttpResponse } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductSelect } from 'src/app/product/_interfaces/product-select';
import { ProductService } from 'src/app/product/_services/product.service';
import { StorageProduct } from '../_interfaces/storage-product';
import { StorageProductsList } from '../_interfaces/storage-products-list';
import { Storages } from '../_interfaces/storages';
import { StorageService } from '../_services/storage.service';

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

  storageId = +this.route.snapshot.params.storageId;
  storage: Storages;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private productService: ProductService,
    private storageService: StorageService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.initialize();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  initialize() {
    this.getStorage(this.storageId);
    this.createForm();
    this.getProducts();
  }

  getStorage(storageId: number) {
    this.storageService.getStorage(storageId).subscribe((storage: Storages) => {
      this.storage = storage;
    });
  }

  createForm() {
    this.formGroup = this.fb.group({
      product: ['', Validators.required],
      date: ['', [Validators.required]],
      quantity: ['', Validators.required],
      type: [true],
      fromTo: []
    });
  }

  getProducts() {
    this.subscription = this.productService.getProductsSelect().subscribe((products: ProductSelect[]) => {
      this.productsSelect = products;
    });
  }

  addIxport() {
    // Export will be insert with negative values
    const quantity = this.formGroup.value.type
      ? this.formGroup.value.quantity
      : this.formGroup.value.quantity - 2 * this.formGroup.value.quantity;

    const ixport = <StorageProduct>{
      storageId: this.storageId,
      productId: this.formGroup.value.product.productId,
      date: this.formGroup.value.date,
      quantity: quantity,
      type: this.formGroup.value.type,
      fromTo: this.formGroup.value.fromTo
    };

    this.subscription = this.storageService.addStorageProduct(ixport).subscribe((res: StorageProduct) => {
      if (res) {
        const newAdded = <StorageProductsList>{
          id: res.id,
          storageId: res.storageId,
          productId: res.productId,
          date: res.date,
          quantity: res.quantity,
          type: res.type,
          fromTo: res.fromTo,
          productName: this.formGroup.value.product.productName
        };

        this.importTable.unshift(newAdded);
        this.tableSource = new MatTableDataSource(this.importTable);

        if (res.type) {
          this.snackBar.open('Product has been imported', 'Success');
        } else {
          this.snackBar.open('Product has been exported', 'Success');
        }
      }
    });
  }

  deleteIxport(item: StorageProduct) {
    this.storageService.deleteStorageProduct(item.storageId, item.id).subscribe((res: boolean) => {
      if (res) {
        const index = this.importTable.findIndex(s => s.id === item.id);

        this.importTable.splice(index, 1);
        this.tableSource = new MatTableDataSource(this.importTable);

        if (item.type) {
          this.snackBar.open('Import info has been deleted.', 'Success');
        } else {
          this.snackBar.open('Export info has been deleted.', 'Success');
        }
      } else {
        this.snackBar.open('Can not delete this information', 'Error');
      }
    });
  }
}
