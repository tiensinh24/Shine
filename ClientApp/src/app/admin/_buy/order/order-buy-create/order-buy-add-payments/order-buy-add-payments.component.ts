import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Payment } from 'src/app/_shared/intefaces/public/payment';

@Component({
  selector: 'app-order-buy-add-payments',
  templateUrl: './order-buy-add-payments.component.html',
  styleUrls: ['./order-buy-add-payments.component.scss']
})
export class OrderBuyAddPaymentsComponent implements OnInit, OnDestroy {
  paymentForms: FormGroup;
  paymentsToAdd: Payment[] = [];

  @Output() payments = new EventEmitter<Payment[]>();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.createForm();
  }

  ngOnDestroy() {}

  createForm() {
    this.paymentForms = this.fb.group({
      paymentDate: [''],
      amount: [''],
      currency: [true],
      rate: ['']
    });
  }

  addPayment() {
    const payment = <Payment>{
      paymentDate: this.paymentForms.value.paymentDate,
      amount: this.paymentForms.value.amount,
      currency: this.paymentForms.value.currency,
      rate: this.paymentForms.value.rate
    };

    this.paymentsToAdd.push(payment);
    this.outPayments();
  }

  removePayment(payment: Payment) {
    const index = this.paymentsToAdd.findIndex(p => p.paymentDate === payment.paymentDate);

    if (index > -1) {
      this.paymentsToAdd.splice(index, 1);
      this.outPayments();
    }
  }

  private outPayments() {
    this.payments.emit(this.paymentsToAdd);
  }
}
