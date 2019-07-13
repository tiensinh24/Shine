import { Subscription, fromEvent } from 'rxjs';
import { Payment } from 'src/app/_shared/intefaces/public/payment';
import { SupplierService } from 'src/app/_shared/services/buy/supplier.service';
import { Component, OnDestroy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { OrderBuy } from 'src/app/_shared/intefaces/buy/order/order-buy';
import { SupplierSelect } from 'src/app/_shared/intefaces/buy/supplier/supplier-select';
import { EmployeeSelect } from 'src/app/_shared/intefaces/public/employee-select';
import { OrderBuyWithNavigations } from 'src/app/_shared/intefaces/buy/order/order-buy-with-details-to-add-dto';
import { OrderBuyProducts } from 'src/app/_shared/intefaces/buy/order/order-buy-products';
import { Cost } from 'src/app/_shared/intefaces/public/cost';
import { OrderBuyService } from 'src/app/_shared/services/buy/order-buy.service';
import { EmployeeService } from 'src/app/_shared/services/public/employee.service';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-order-buy-create',
  templateUrl: './order-buy-create.component.html',
  styleUrls: ['./order-buy-create.component.css']
})
export class OrderBuyCreateComponent implements OnInit, AfterViewInit, OnDestroy {
  subscription = new Subscription();

  title = 'Add new order';
  orderForms: FormGroup;
  order: OrderBuy;
  suppliers: SupplierSelect[];
  selectedSupplierId: number;
  employees: EmployeeSelect[];
  supplierName: string;
  orderToAdd: OrderBuyWithNavigations;

  // boolean
  isDetailStep = false;

  // Get from child component
  productsToAdd: OrderBuyProducts[] = [];
  paymentsToAdd: Payment[] = [];
  costsToAdd: Cost[] = [];

  // Viewchild
  @ViewChild('selectedSupplier', {static: false}) selectedSupplier: MatSelect;

  constructor(
    private orderService: OrderBuyService,
    private supplierService: SupplierService,
    private employeeService: EmployeeService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.createForm();
    this.getSuppliersSelect();
    this.getEmployeesSelect();
  }

  ngAfterViewInit() {
    this.selectedSupplier.selectionChange.subscribe(() => {
      this.isDetailStep = false;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  createForm() {
    this.orderForms = this.fb.group({
      orderNumber: ['', Validators.required],
      dateOfIssue: ['', Validators.required],
      timeForPayment: ['', Validators.required],
      personId: ['', Validators.required],
      employeeId: ['', Validators.required]
    });
  }

  getSuppliersSelect() {
    this.subscription = this.supplierService.getSuppliersSelect().subscribe((suppliers: SupplierSelect[]) => {
      this.suppliers = suppliers;
    });
  }

  getEmployeesSelect() {
    this.subscription = this.employeeService.getEmployeesSelect().subscribe((employees: EmployeeSelect[]) => {
      this.employees = employees;
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

    this.orderToAdd = {
      orderId: 0,
      orderNumber: this.order.orderNumber,
      dateOfIssue: this.order.dateOfIssue,
      timeForPayment: this.order.timeForPayment,
      personId: this.order.personId,
      employeeId: this.order.employeeId,

      productOrders: this.productsToAdd,
      payments: this.paymentsToAdd,
      costs: this.costsToAdd
    };
    this.orderService.addOrder(this.orderToAdd).subscribe(
      () => {
        this.snackBar.open(`Order ${this.order.orderNumber} added`, 'Success');
        this.router.navigate(['/admin/order-buy']);
      },
      error => {
        if (error.status === 409) {
          this.snackBar.open(`${error.error}`, 'Error');
        }
      }
    );
  }

  onCancel() {
    this.router.navigate(['/admin/order-buy']);
  }

  toDetailStep() {
    if (this.orderForms.valid) {
      this.isDetailStep = true;
    }
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
