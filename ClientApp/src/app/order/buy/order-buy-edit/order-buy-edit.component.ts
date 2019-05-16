import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Payment } from 'src/app/order/_interfaces/payment';
import { SupplierSelect } from 'src/app/supplier/_interfaces/supplier-select';
import { SupplierService } from 'src/app/supplier/_services/supplier.service';
import { OrderBuy } from '../_interfaces/order-buy';
import { OrderBuyProducts } from '../_interfaces/order-buy-products';
import { OrderBuyWithDetailsToAddDto } from '../_interfaces/order-buy-with-details-to-add-dto';
import { OrderBuyService } from '../_services/order-buy.service';
import { Cost } from '../../_interfaces/cost';

@Component({
  selector: 'app-order-buy-edit',
  templateUrl: './order-buy-edit.component.html',
  styleUrls: ['./order-buy-edit.component.css']
})
export class OrderBuyEditComponent implements OnInit, OnDestroy {
  orderSub = new Subscription();
  suppliersSub = new Subscription();

  title = 'Add new order';
  orderForms: FormGroup;
  order: OrderBuy;
  suppliers: SupplierSelect[];
  supplierName: string;
  orderWithDetailsToAdd: OrderBuyWithDetailsToAddDto;

  // Get from child component
  productsToAdd: OrderBuyProducts[] = [];
  paymentsToAdd: Payment[] = [];
  costsToAdd: Cost[] = [];

  constructor(
    private orderService: OrderBuyService,
    private supplierService: SupplierService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.createForm();
    this.getSuppliersSelect();
  }

  ngOnDestroy(): void {
    this.orderSub.unsubscribe();
    this.suppliersSub.unsubscribe();
  }

  createForm() {
    this.orderForms = this.fb.group({
      orderNumber: ['', Validators.required],
      dateOfIssue: ['', Validators.required],
      timeForPayment: ['', Validators.required],
      personId: ['', Validators.required]
    });
  }

  getSuppliersSelect() {
    this.suppliersSub = this.supplierService.getSuppliersSelect().subscribe((suppliers: SupplierSelect[]) => {
      this.suppliers = suppliers;
    });
  }

  getSupplierName() {
    const supplier = this.suppliers.find(p => p.personId === this.orderForms.value.personId);

    this.supplierName = supplier.fullName;
  }

  getProductsToAddFromChild($event: OrderBuyProducts[]) {
    this.productsToAdd = $event;
  }

  getPaymentsToAddFromChild($event: Payment[]) {
    this.paymentsToAdd = $event;
  }

  getCostsToAddFromChild($event: Cost[]) {
    this.costsToAdd = $event;
  }

  onSubmit() {
    this.order = this.orderForms.value;

    this.orderWithDetailsToAdd = {
      orderBuy: this.order,
      productOrders: this.productsToAdd,
      payments: this.paymentsToAdd,
      costs: this.costsToAdd
    };
    this.orderService.addOrderWithDetails(this.orderWithDetailsToAdd).subscribe((res: boolean) => {
      if (res) {
        this.snackBar.open(`Order ${this.order.orderNumber} added`, 'Success');
        this.router.navigate(['/order-buy']);
      }
    });
  }

  onCancel() {
    this.router.navigate(['order-buy']);
  }

  get(name: string): AbstractControl {
    return this.orderForms.get(name);
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
