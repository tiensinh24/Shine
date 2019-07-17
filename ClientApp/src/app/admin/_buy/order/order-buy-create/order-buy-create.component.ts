import { Subscription } from 'rxjs';
import { Payment } from 'src/app/_shared/intefaces/public/payment';
import { SupplierService } from 'src/app/_shared/services/buy/supplier.service';
import { Component, OnDestroy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
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
import { OrderNumberExistValidator } from './_validators/order-number-exist.directive';
import { MustAfterValidator } from 'src/app/_shared/helpers/validators/must-after.directive';

@Component({
  selector: 'app-order-buy-create',
  templateUrl: './order-buy-create.component.html',
  styleUrls: ['./order-buy-create.component.css']
})
export class OrderBuyCreateComponent implements OnInit, AfterViewInit, OnDestroy {
  subscription$ = new Subscription();

  title = 'New order';
  orderForm: FormGroup;

  order: OrderBuy;
  suppliers: SupplierSelect[];
  employees: EmployeeSelect[];
  supplierName: string;
  orderToAdd: OrderBuyWithNavigations;

  // boolean
  orderSubmit = false;

  // Get from child component
  productsToAdd: OrderBuyProducts[] = [];
  paymentsToAdd: Payment[] = [];
  costsToAdd: Cost[] = [];

  // Viewchild
  @ViewChild('selectedSupplier', { static: false }) selectedSupplier: MatSelect;

  constructor(
    private orderService: OrderBuyService,
    private supplierService: SupplierService,
    private employeeService: EmployeeService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private orderNumberExistValidator: OrderNumberExistValidator
  ) {}

  ngOnInit() {
    this.createForm();
    this.getSuppliersSelect();
    this.getEmployeesSelect();
  }

  ngAfterViewInit() {
    this.subscription$.add(
      this.selectedSupplier.selectionChange.subscribe(() => {
        this.orderSubmit = false;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  createForm() {
    this.orderForm = this.fb.group(
      {
        orderNumber: [
          '',
          {
            validators: [Validators.required],
            asyncValidators: [this.orderNumberExistValidator.validate.bind(this.orderNumberExistValidator)],
            updateOn: 'blur'
          }
        ],
        dateOfIssue: ['', { updateOn: 'blur' }, Validators.required],
        timeForPayment: ['', { updateOn: 'blur' }, Validators.required],
        personId: ['', { updateOn: 'blur' }, Validators.required],
        employeeId: ['', { updateOn: 'blur' }, Validators.required]
      },
      { validators: MustAfterValidator('dateOfIssue', 'timeForPayment') }
    );
  }

  getSuppliersSelect() {
    this.subscription$.add(
      this.supplierService.getSuppliersSelect().subscribe((suppliers: SupplierSelect[]) => {
        this.suppliers = suppliers;
      })
    );
  }

  getEmployeesSelect() {
    this.subscription$.add(
      this.employeeService.getEmployeesSelect().subscribe((employees: EmployeeSelect[]) => {
        this.employees = employees;
      })
    );
  }

  getSupplierName() {
    const supplier = this.suppliers.find(p => p.personId === this.orderForm.value.personId);

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
    this.order = this.orderForm.value;

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

  submitOrder() {
    if (this.orderForm.valid) {
      this.orderSubmit = true;
    }
  }

  get(name: string): AbstractControl {
    return this.orderForm.get(name);
  }

  getErrorMessage(name: string, value: string) {
    const control = this.orderForm.get(name);

    return control.hasError('required') ? `${value} is required` : control.hasError('exist') ? `${value} already exist` : '';
  }
}
