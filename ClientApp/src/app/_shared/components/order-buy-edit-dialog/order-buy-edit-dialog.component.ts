import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import {
  Validators,
  FormGroup,
  FormBuilder,
  AbstractControl,
  FormControl,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs';

import { environment } from 'src/environments/environment';
import { OrderBuyService } from 'src/app/order/buy/_services/order-buy.service';
import { SupplierService } from 'src/app/supplier/_services/supplier.service';
import { SupplierList } from 'src/app/supplier/_interfaces/supplier-list';
import { OrderBuy } from 'src/app/order/buy/_interfaces/order-buy';

@Component({
  selector: 'app-order-buy-edit-dialog',
  templateUrl: './order-buy-edit-dialog.component.html',
  styleUrls: ['./order-buy-edit-dialog.component.css'],
})
export class OrderBuyEditDialogComponent implements OnInit, OnDestroy {
  baseUrl = environment.URL;
  suppliers: SupplierList[];
  formGroup: FormGroup;
  title: string;

  suppliersSub = new Subscription();
  orderUpdateSub = new Subscription();

  constructor(
    private fb: FormBuilder,
    private orderBuyService: OrderBuyService,
    private supplierService: SupplierService,
    private dialogRef: MatDialogRef<OrderBuyEditDialogComponent>,
    // Inject data from supplier-list component
    @Inject(MAT_DIALOG_DATA) public dataFromDetail,
  ) {}

  ngOnInit() {
    this.createForm();

    this.title = `Edit ${this.dataFromDetail.orderNumber}`;

    this.updateForm();

    this.getSuppliers();
  }

  ngOnDestroy(): void {
    this.suppliersSub.unsubscribe();
    this.orderUpdateSub.unsubscribe();
  }

  createForm() {
    this.formGroup = this.fb.group({
      orderNumber: ['', Validators.required],
      dateOfIssue: ['', Validators.required],
      timeForPayment: ['', Validators.required],
      personId: ['', Validators.required],
    });
  }

  updateForm() {
    this.formGroup.setValue({
      orderNumber: this.dataFromDetail.orderNumber,
      dateOfIssue: this.dataFromDetail.dateOfIssue,
      timeForPayment: this.dataFromDetail.timeForPayment,
      personId: this.dataFromDetail.personId,
    });
  }

  getSuppliers() {
    this.suppliersSub = this.supplierService.getSuppliers().subscribe(res => {
      this.suppliers = res;
    });
  }

  onSubmit() {
    const tempOrder = <OrderBuy>{
      orderId: this.dataFromDetail.orderId,
      orderNumber: this.formGroup.value.orderNumber,
      dateOfIssue: this.formGroup.value.dateOfIssue,
      timeForPayment: this.formGroup.value.timeForPayment,
      personId: this.formGroup.value.personId,
    };

    this.orderUpdateSub = this.orderBuyService
      .updateOrder(tempOrder)
      .subscribe(res => {
        this.dialogRef.close(res);
      });
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
