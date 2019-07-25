import { fromEvent, merge, Subscription, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, catchError } from 'rxjs/operators';
import { OrderBuy } from 'src/app/_shared/intefaces/buy/order/order-buy';
import { OrderBuyService } from 'src/app/_shared/services/buy/order-buy.service';

import { environment } from 'src/environments/environment';

import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SupplierSelect } from 'src/app/_shared/intefaces/buy/supplier/supplier-select';
import { EmployeeSelect } from 'src/app/_shared/intefaces/public/employee-select';
import { EmployeeService } from 'src/app/_shared/services/public/employee.service';

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

  sub$ = new Subscription();

  constructor(
    private fb: FormBuilder,
    private orderBuyService: OrderBuyService,
    private employeeService: EmployeeService,
    private dialogRef: MatDialogRef<OrderBuyEditDialogComponent>,
    // Inject data from parent component
    @Inject(MAT_DIALOG_DATA) public parentData
  ) {}

  ngOnInit() {
    this.initialize();
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

  initialize() {
    this.title = `Edit order ${this.parentData.orderNumber}`;
    this.createForm();

    this.updateForm();

    this.getEmployeesSelect();

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

  getEmployeesSelect() {
    this.sub$.add(
      this.employeeService.getEmployeesSelect().subscribe((employees: EmployeeSelect[]) => {
        this.employees = this.filteredEmployees = employees;
      })
    );
  }

  createForm() {
    this.formGroup = this.fb.group({
      orderNumber: ['', Validators.required],
      dateOfIssue: ['', Validators.required],
      timeForPayment: ['', Validators.required],
      supplierName: [{ value: '', disabled: true }],
      employee: [''],
      rating: [0]
    });
  }

  updateForm() {
    this.rating = this.parentData.rating;

    this.formGroup.setValue({
      orderNumber: this.parentData.orderNumber,
      dateOfIssue: this.parentData.dateOfIssue,
      timeForPayment: this.parentData.timeForPayment,
      supplierName: this.parentData.supplierName,
      employee: <EmployeeSelect>{
        employeeId: this.parentData.employeeId,
        fullName: this.parentData.employeeName
      },
      rating: this.parentData.rating
    });
  }

  onSubmit() {
    const tempOrder = <OrderBuy>{
      orderId: this.parentData.orderId,
      orderNumber: this.formGroup.value.orderNumber,
      dateOfIssue: this.formGroup.value.dateOfIssue,
      timeForPayment: this.formGroup.value.timeForPayment,
      personId: this.parentData.personId,
      employeeId: this.formGroup.value.employee.employeeId,
      rating: this.formGroup.value.rating
    };

    this.sub$.add(
      this.orderBuyService.updateOrder(tempOrder).subscribe((res: OrderBuy) => {
        if (res) {
          this.dialogRef.close(res);
        } else {
          this.dialogRef.close();
        }
      }, catchError(error => of([error])))
    );
  }

  onCancel() {
    this.dialogRef.close('cancel');
  }

  get(name: string): AbstractControl {
    return this.formGroup.get(name);
  }

  getErrorMessage(name: string, value: string) {
    const control = this.formGroup.get(name);

    return control.hasError('required') ? `${value} is required` : null;
  }

  displayFn(employee: EmployeeSelect): string | undefined {
    return employee ? employee.fullName : undefined;
  }
}
