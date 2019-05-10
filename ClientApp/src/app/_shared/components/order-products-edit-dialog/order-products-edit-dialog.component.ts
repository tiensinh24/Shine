import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-order-products-edit-dialog',
  templateUrl: './order-products-edit-dialog.component.html',
  styleUrls: ['./order-products-edit-dialog.component.scss']
})
export class OrderProductsEditDialogComponent implements OnInit {
  formGroup: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.fb.group({
      orderId: [''],
      productId: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required],
      tax: [''],
      rate: ['', Validators.required],
      unit: ['', Validators.required]
    });
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
