import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Payment } from 'src/app/_shared/intefaces/public/payment';

@Component({
  selector: 'app-order-buy-add-payments',
  templateUrl: './order-buy-add-payments.component.html',
  styleUrls: ['./order-buy-add-payments.component.scss']
})
export class OrderBuyAddPaymentsComponent implements OnInit, OnDestroy {
  paymentForm: FormGroup;
  paymentsToAdd: Payment[] = [];

  @Output() payments = new EventEmitter<Payment[]>();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.createForm();
  }

  ngOnDestroy() {}

  createForm() {
    this.paymentForm = this.fb.group({
      paymentDate: ['', { updateOn: 'blur' }, Validators.required],
      amount: ['', { updateOn: 'blur' }, Validators.required],
      currency: [true, { updateOn: 'blur' }, Validators.required],
      rate: ['', { updateOn: 'blur' }, Validators.required]
    });
  }

  addPayment() {
    if (this.paymentForm.valid) {
      const payment = <Payment>{
        paymentDate: this.paymentForm.value.paymentDate,
        amount: this.paymentForm.value.amount,
        currency: this.paymentForm.value.currency,
        rate: this.paymentForm.value.rate
      };

      this.paymentsToAdd.push(payment);
      this.outPayments();
    }
  }

  removePayment(payment: Payment) {
    const index = this.paymentsToAdd.findIndex(p => p === payment);

    if (index > -1) {
      this.paymentsToAdd.splice(index, 1);
      this.outPayments();
    }
  }

  private outPayments() {
    this.payments.emit(this.paymentsToAdd);
  }

  get(name: string): AbstractControl {
    return this.paymentForm.get(name);
  }

  getErrorMessage(name: string, value: string) {
    const control = this.paymentForm.get(name);

    return control.hasError('required') ? `${value} is required` : null;
  }
}
