import { formatDate } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Payment } from 'src/app/_shared/intefaces/public/payment';
import { PaymentService } from 'src/app/_shared/services/public/payment.service';

@Component({
  selector: 'app-payment-edit-dialog',
  templateUrl: './payment-edit-dialog.component.html',
  styleUrls: ['./payment-edit-dialog.component.scss']
})
export class PaymentEditDialogComponent implements OnInit, OnDestroy {
  // Subscription
  sub$ = new Subscription();

  title: string;
  payment: Payment;
  paymentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private dialogRef: MatDialogRef<PaymentEditDialogComponent>,
    // Inject data from main component
    @Inject(MAT_DIALOG_DATA) public parentData
  ) {}

  ngOnInit() {
    this.createForm();

    if (this.parentData.edit) {
      this.title = 'Edit payment on ' + formatDate(this.parentData.paymentDate, 'dd/MM/yyyy', 'en-GB');
      this.updateForm();
      // Create mode
    } else {
      this.title = 'New payment';
    }
  }

  ngOnDestroy() {
    this.sub$.unsubscribe();
  }

  createForm() {
    this.paymentForm = this.fb.group({
      orderId: [{ value: '', disabled: true }, Validators.required],
      paymentDate: ['', Validators.required],
      amount: ['', Validators.required],
      currency: [true, Validators.required],
      rate: ['', Validators.required]
    });
  }

  updateForm() {
    this.paymentForm.setValue({
      orderId: this.parentData.orderId,
      paymentDate: this.parentData.paymentDate,
      amount: this.parentData.amount,
      currency: this.parentData.currency,
      rate: this.parentData.rate
    });
  }

  onSubmit() {
    const payment = <Payment>{
      orderId: this.parentData.orderId,
      paymentDate: this.paymentForm.value.paymentDate,
      amount: this.paymentForm.value.amount,
      currency: this.paymentForm.value.currency,
      rate: this.paymentForm.value.rate
    };

    // Add new payment
    if (!this.parentData.edit) {
      this.sub$ = this.paymentService.addPayment(payment).subscribe((res: Payment) => {
        this.dialogRef.close(res);
      });
    } else {
      payment.paymentId = this.parentData.paymentId;

      // Update payment
      this.sub$ = this.paymentService.updatePayment(payment).subscribe((res: Payment) => {
        this.dialogRef.close(res);
      });
    }
  }

  onCancel() {
    this.dialogRef.close('cancel');
  }

  get(name: string): AbstractControl {
    return this.paymentForm.get(name);
  }

  getErrorMessage(name: string, value: string) {
    const control = this.paymentForm.get(name);

    return control.hasError('required') ? `${value} is required` : null;
  }
}
