import { ClickEvent } from 'angular-star-rating';
import { fromEvent, merge, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { EmployeeSelect } from 'src/app/employee/_interfaces/employee-select';
import { EmployeeService } from 'src/app/employee/_services/employee.service';
import { OrderBuy } from 'src/app/order/buy/_interfaces/order-buy';
import { OrderBuyService } from 'src/app/order/buy/_services/order-buy.service';
import { SupplierSelect } from 'src/app/supplier/_interfaces/supplier-select';
import { SupplierService } from 'src/app/supplier/_services/supplier.service';
import { environment } from 'src/environments/environment';

import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-buy-edit-dialog',
  templateUrl: './order-buy-edit-dialog.component.html',
  styleUrls: ['./order-buy-edit-dialog.component.css']
})
export class OrderBuyEditDialogComponent implements OnInit, OnDestroy {
  baseUrl = environment.URL;
  suppliers: SupplierSelect[];
  formGroup: FormGroup;
  title: string;

  // Employees autocomplete
  employees: EmployeeSelect[];
  filteredEmployees: EmployeeSelect[];
  @ViewChild('employeeInput', { static: true }) employeeInput: ElementRef;

  // Star rating
  rating: number;

  subscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private orderBuyService: OrderBuyService,
    private supplierService: SupplierService,
    private employeeService: EmployeeService,
    private dialogRef: MatDialogRef<OrderBuyEditDialogComponent>,
    // Inject data from supplier-list component
    @Inject(MAT_DIALOG_DATA) public dataFromDetail
  ) {}

  ngOnInit() {
    this.initialize();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  initialize() {
    this.title = `Edit ${this.dataFromDetail.orderNumber}`;
    this.createForm();

    this.updateForm();

    this.getEmployees();

    // Disable edit supplier because order lineitems will...
    this.getSuppliersSelect();

    // Filter employee autocomplete
    merge(fromEvent(this.employeeInput.nativeElement, 'keyup'), fromEvent(this.employeeInput.nativeElement, 'click'))
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap(() => {
          const filter = this.employeeInput.nativeElement.value;

          this.filteredEmployees = this.employees.filter(e => e.fullName.toLowerCase().includes(filter));
        })
      )
      .subscribe();
  }

  getEmployees() {
    this.subscription = this.employeeService.getEmployeesSelect().subscribe((employees: EmployeeSelect[]) => {
      this.employees = this.filteredEmployees = employees;
    });
  }

  createForm() {
    this.formGroup = this.fb.group({
      orderNumber: ['', Validators.required],
      dateOfIssue: ['', Validators.required],
      timeForPayment: ['', Validators.required],
      personId: ['', Validators.required],
      employee: [''],
      rating: ['']
    });
  }

  updateForm() {
    this.rating = this.dataFromDetail.rating;

    this.formGroup.setValue({
      orderNumber: this.dataFromDetail.orderNumber,
      dateOfIssue: this.dataFromDetail.dateOfIssue,
      timeForPayment: this.dataFromDetail.timeForPayment,
      personId: this.dataFromDetail.personId,
      employee: <EmployeeSelect>{
        employeeId: this.dataFromDetail.employeeId,
        fullName: this.dataFromDetail.employeeName
      },
      rating: this.dataFromDetail.rating
    });
  }

  getSuppliersSelect() {
    this.subscription = this.supplierService.getSuppliersSelect().subscribe(res => {
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
      employeeId: this.formGroup.value.employee.employeeId,
      rating: this.formGroup.value.rating
    };

    this.subscription = this.orderBuyService.updateOrder(tempOrder).subscribe(res => {
      this.dialogRef.close(res);
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  goToDetail() {
    this.dialogRef.close();
    this.router.navigate([`order-buy/${this.dataFromDetail.orderId}`]);
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

  displayFn(employee: EmployeeSelect): string | undefined {
    return employee ? employee.fullName : undefined;
  }
}
