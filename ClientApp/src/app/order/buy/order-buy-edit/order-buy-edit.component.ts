import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  AbstractControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { OrderBuyService } from '../_services/order-buy.service';
import { OrderBuyDto } from '../_interfaces/order-buy-dto';
import { SupplierDto } from 'src/app/supplier/_interfaces/supplier-dto';
import { SupplierService } from 'src/app/supplier/_services/supplier.service';
import { OrderBuy } from '../_interfaces/order-buy';
import { ProductOrderDto } from '../_interfaces/product-order-dto';
import { OrderBuyWithDetailsToAddDto } from '../_interfaces/order-buy-with-details-to-add-dto';
import { ProductOrder } from '../_interfaces/product-order';

@Component({
  selector: 'app-order-buy-edit',
  templateUrl: './order-buy-edit.component.html',
  styleUrls: ['./order-buy-edit.component.css'],
})
export class OrderBuyEditComponent implements OnInit, OnDestroy {
  orderSub = new Subscription();
  suppliersSub = new Subscription();

  title: string;
  editMode = false;
  formGroup: FormGroup;
  order: OrderBuyDto;
  suppliers: SupplierDto[];
  orderWithDetailsToAdd: OrderBuyWithDetailsToAddDto;

  // Input
  selectedOrder: number;

  // Output
  productsToAdd: ProductOrderDto[] = [];

  constructor(
    private orderService: OrderBuyService,
    private supplierService: SupplierService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.createForm();
    this.getSuppliers();

    const id = +this.route.snapshot.params.orderId;

    if (id > 0) {
      this.editMode = true;

      this.getOrder(id);

      setTimeout(() => {
        this.updateForm();
        this.title = `Edit Order ${this.order.orderNumber}`;
      });
    } else {
      this.editMode = false;
      this.title = 'Create New Order';
    }
  }

  ngOnDestroy(): void {
    this.orderSub.unsubscribe();
    this.suppliersSub.unsubscribe();
  }

  createForm() {
    this.formGroup = this.fb.group({
      orderNumber: ['', Validators.required],
      dateOfIssue: ['', Validators.required],
      timeForPayment: ['', Validators.required],
      personId: ['', Validators.required],
    });
  }

  getOrderFromForm() {
    this.order = this.formGroup.value;
  }

  updateForm() {
    this.formGroup.setValue({
      orderNumber: this.order.orderNumber,
      dateOfIssue: this.order.dateOfIssue,
      timeForPayment: this.order.timeForPayment,
      personId: this.order.personId,
    });
  }

  getOrder(orderId: number) {
    this.orderSub = this.orderService.getOrder(orderId).subscribe(res => {
      this.order = res;
      this.selectedOrder = res.orderId;
    });
  }

  getSuppliers() {
    this.suppliersSub = this.supplierService.getSuppliers().subscribe(res => {
      this.suppliers = res;
    });
  }

  getProductsToAddFromChild($event: ProductOrderDto[]) {
    this.productsToAdd = $event;
  }

  onAddOrderWithDetails() {
    this.orderService.addProductsOrder(this.productsToAdd).subscribe();
  }

  onSubmit() {
    this.getOrderFromForm();

    this.orderWithDetailsToAdd = {
      orderBuy: this.order,
      productOrders: this.productsToAdd,
    };
    this.orderService
      .addOrderWithDetails(this.orderWithDetailsToAdd)
      .subscribe();

  }

  onCancel() {
    this.router.navigate(['order-buy']);
  }

  addOrder(orderBuy: OrderBuy) {
    this.orderService.addOrder(orderBuy).subscribe(res => {
      this.selectedOrder = res.orderId;
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
