import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { ProductSelect } from 'src/app/_shared/intefaces/public/product-select';
import { ProductService } from 'src/app/_shared/services/public/product.service';
import { StorageService } from 'src/app/_shared/services/public/storage.service';
import { StorageProductsList } from 'src/app/_shared/intefaces/public/storage/storage-products-list';
import { StorageProduct } from 'src/app/_shared/intefaces/public/storage/storage-product';

@Component({
  selector: 'app-storage-product-edit-dialog',
  templateUrl: './storage-product-edit-dialog.component.html',
  styleUrls: ['./storage-product-edit-dialog.component.scss']
})
export class StorageProductEditDialogComponent implements OnInit, OnDestroy {
  products: ProductSelect[];
  formGroup: FormGroup;
  title = 'Edit Information';

  subscription: Subscription;

  constructor(
    private productService: ProductService,
    private storageService: StorageService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<StorageProductEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public parentData: StorageProductsList
  ) {}

  ngOnInit() {
    this.getProductsSelect();
    this.createForm();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  initialize() {
    this.getProductsSelect();
    this.createForm();
  }

  createForm() {
    this.formGroup = this.fb.group({
      productId: [this.parentData.productId, Validators.required],
      date: [this.parentData.date, Validators.required],
      quantity: [this.parentData.quantity, Validators.required],
      type: [this.parentData.type, Validators.required],
      fromTo: [this.parentData.fromTo]
    });
  }

  getProductsSelect() {
    this.subscription = this.productService.getProductsSelect().subscribe((products: ProductSelect[]) => {
      this.products = products;
    });
  }

  onSubmit() {
    const updateItem = <StorageProduct>{
      id: this.parentData.id,
      productId: this.formGroup.value.productId,
      date: this.formGroup.value.date,
      quantity: this.formGroup.value.quantity,
      type: this.formGroup.value.type,
      fromTo: this.formGroup.value.fromTo
    };

    this.subscription = this.storageService.updateStorageProduct(updateItem).subscribe(
      (res: StorageProduct) => {
        if (res) {
          this.dialogRef.close(res);
          this.snackBar.open('Information has been updated', 'Success');
        }
      },
      () => {
        this.snackBar.open('Cannot update information', 'Error');
      }
    );
  }

  onCancel() {
    this.dialogRef.close();
  }

  get(name: string): AbstractControl {
    return this.formGroup.get(name);
  }

  getErrorMessage(formControl: FormControl) {
    return formControl.hasError('required')
      ? 'You must enter a value'
      : formControl.hasError('email')
      ? 'Not a valid email'
      : formControl.hasError('pattern')
      ? 'Please enter a number!'
      : '';
  }
}
