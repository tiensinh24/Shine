import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs';
import { ProductSelect } from 'src/app/product/_interfaces/product-select';
import { ProductService } from 'src/app/product/_services/product.service';

@Component({
  selector: 'app-storage-product-edit-dialog',
  templateUrl: './storage-product-edit-dialog.component.html',
  styleUrls: ['./storage-product-edit-dialog.component.scss']
})
export class StorageProductEditDialogComponent implements OnInit, OnDestroy {
  products: ProductSelect[];
  formGroup: FormGroup;
  title = 'Import product';

  subscription: Subscription;

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,

    // parentData has edit property(boolean)
    @Inject(MAT_DIALOG_DATA) public parentData: any
  ) {}

  ngOnInit() {
    this.getProductsSelect();
    this.createForm();

    if (this.parentData.edit) {
      this.updateForm();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  createForm() {
    this.formGroup = this.fb.group({
      storageId: [this.parentData.storageId, Validators.required],
      productId: ['', Validators.required],
      date: ['', Validators.required],
      quantity: ['', Validators.required]
    });
  }

  updateForm() {
    this.formGroup.setValue({
      storageId: this.parentData.storageId,
      productId: this.parentData.productId,
      date: this.parentData.date,
      quantity: this.parentData.quantity
    });
  }

  getProductsSelect() {
    this.subscription = this.productService.getProductsSelect().subscribe((products: ProductSelect[]) => {
      this.products = products;
    });
  }
}
