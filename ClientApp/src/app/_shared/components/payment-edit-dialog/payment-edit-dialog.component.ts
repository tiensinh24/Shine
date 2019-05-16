import { formatDate } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs';
import { Payment } from 'src/app/order/_interfaces/payment';
import { PaymentService } from 'src/app/payment/_services/payment.service';

@Component({
  selector: 'app-payment-edit-dialog',
  templateUrl: './payment-edit-dialog.component.html',
  styleUrls: ['./payment-edit-dialog.component.scss']
})
export class PaymentEditDialogComponent implements OnInit, OnDestroy {
  title: string;
  editMode: boolean;
  payment: Payment;
  formGroup: FormGroup;

  subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private dialogRef: MatDialogRef<PaymentEditDialogComponent>,
    // Inject data from main component
    @Inject(MAT_DIALOG_DATA) public parentData: Payment
  ) {}

  ngOnInit() {
    this.createForm();

    // Check if data isn't null (edit mode)
    if (this.parentData.paymentId > 0) {
      this.editMode = true;
      this.title = 'Edit payment on ' + formatDate(this.parentData.paymentDate, 'dd/MM/yyyy', 'en-GB');
      this.updateForm();
      // Create mode
    } else {
      this.formGroup.patchValue({
        orderId: this.parentData.orderId
      });
      this.editMode = false;
      this.title = 'Add new payment';
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  createForm() {
    this.formGroup = this.fb.group({
      orderId: [{ value: '', disabled: true }, Validators.required],
      paymentDate: ['', Validators.required],
      amount: ['', Validators.required],
      currency: [true, Validators.required],
      rate: ['', Validators.required]
    });
  }

  updateForm() {
    this.formGroup.setValue({
      orderId: this.parentData.orderId,
      paymentDate: this.parentData.paymentDate,
      amount: this.parentData.amount,
      currency: this.parentData.currency,
      rate: this.parentData.rate
    });
  }

  onSubmit() {
    let paymentReturn = <Payment>{};
    const tempPayment = <Payment>{};

    tempPayment.orderId = this.parentData.orderId;
    tempPayment.paymentDate = this.formGroup.value.paymentDate;
    tempPayment.amount = this.formGroup.value.amount;
    tempPayment.currency = this.formGroup.value.currency;
    tempPayment.rate = this.formGroup.value.rate;

    // Add new payment
    if (!this.editMode) {
      this.subscription = this.paymentService.addPayment(tempPayment).subscribe((payment: Payment) => {
        paymentReturn = payment;
      });
    }
    if (this.editMode) {
      tempPayment.paymentId = this.parentData.paymentId;

      // Update payment
      this.subscription = this.paymentService.updatePayment(tempPayment).subscribe((payment: Payment) => {
        paymentReturn = payment;
      });
    }

    this.dialogRef.close(paymentReturn);
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

  getFormError(formGroup: FormGroup) {
    return formGroup.getError('auth');
  }
}
