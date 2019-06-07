import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ProductOrder } from 'src/app/order/buy/_interfaces/product-order';
import { OrderBuyService } from 'src/app/order/buy/_services/order-buy.service';
import { ProductSelect } from 'src/app/product/_interfaces/product-select';

@Component({
  selector: 'app-order-products-edit-dialog',
  templateUrl: './order-products-edit-dialog.component.html',
  styleUrls: ['./order-products-edit-dialog.component.scss']
})
export class OrderProductsEditDialogComponent implements OnInit, OnDestroy {
  title = 'Add new product';
  formGroup: FormGroup;
  productsNotAddedSelect: ProductSelect[] = [];

  subscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private orderService: OrderBuyService,
    private dialogRef: MatDialogRef<OrderProductsEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public parentData
  ) {}

  ngOnInit() {
    this.getProductsNotAdded(this.parentData.supplierId);
    this.createForm();

    if (this.parentData.edit) {
      this.title = `Edit product for order ${this.parentData.orderId}`;
      this.updateForm();
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getProductsNotAdded(supplierId: number) {
    this.subscription = this.orderService
      .getProductsNotAddedToOrderBySupplierSelect(this.parentData.orderId, supplierId)
      .subscribe((products: ProductSelect[]) => {
        this.productsNotAddedSelect = products;

        if (this.parentData.edit) {
          // In edit mode we add product from parent to productsNotAdded
          const parentProduct = <ProductSelect>{
            productId: this.parentData.productId,
            productName: this.parentData.productName
          };

          this.productsNotAddedSelect.push(parentProduct);
        }
      });
  }

  createForm() {
    this.formGroup = this.fb.group({
      orderId: [{ value: '', disabled: true }],
      productId: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required],
      tax: [''],
      rate: ['', Validators.required],
      unit: ['', Validators.required]
    });
  }

  updateForm() {
    this.formGroup.setValue({
      orderId: this.parentData.orderId,
      productId: this.parentData.productId,
      quantity: this.parentData.quantity,
      price: this.parentData.price,
      tax: this.parentData.tax,
      rate: this.parentData.rate,
      unit: this.parentData.unit
    });
  }

  onSubmit() {
    const productOrder = <ProductOrder>{
      orderId: this.parentData.orderId,
      productId: this.formGroup.value.productId,
      quantity: this.formGroup.value.quantity,
      price: this.formGroup.value.price,
      tax: this.formGroup.value.tax,
      rate: this.formGroup.value.rate,
      unit: this.formGroup.value.unit
    };

    if (this.parentData.edit) {
      this.subscription = this.orderService.updateOrderProduct(productOrder).subscribe(res => {
        this.dialogRef.close(res);
      });
    } else {
      this.subscription = this.orderService.addOrderProduct(productOrder).subscribe(res => {
        this.dialogRef.close(res);
      });
    }
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
