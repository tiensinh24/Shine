import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  Inject
} from "@angular/core";
import { environment } from "src/environments/environment";
import { CustomerSelect } from "src/app/_shared/intefaces/sell/customer/customer-select";
import { FormGroup, FormBuilder, Validators, AbstractControl } from "@angular/forms";
import { EmployeeSelect } from "src/app/_shared/intefaces/public/employee-select";
import { Subscription, merge, fromEvent, of } from "rxjs";
import { OrderSellService } from "src/app/_shared/services/sell/order-sell.service";
import { EmployeeService } from "src/app/_shared/services/public/employee.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import {
  debounceTime,
  distinctUntilChanged,
  tap,
  catchError
} from "rxjs/operators";
import { OrderSell } from "src/app/_shared/intefaces/sell/order/order-sell";

@Component({
  selector: "app-order-sell-edit-dialog",
  templateUrl: "./order-sell-edit-dialog.component.html",
  styleUrls: ["./order-sell-edit-dialog.component.scss"]
})
export class OrderSellEditDialogComponent implements OnInit, OnDestroy {
  baseUrl = environment.URL;
  suppliers: CustomerSelect[];
  formGroup: FormGroup;
  title: string;

  // Employees autocomplete
  employees: EmployeeSelect[];
  filteredEmployees: EmployeeSelect[];
  @ViewChild("employeeInput", { static: true }) employeeInput: ElementRef;

  // Star rating
  rating: number;

  sub$ = new Subscription();

  constructor(
    private fb: FormBuilder,
    private orderSellService: OrderSellService,
    private employeeService: EmployeeService,
    private dialogRef: MatDialogRef<OrderSellEditDialogComponent>,
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
    merge(
      fromEvent(this.employeeInput.nativeElement, "keyup"),
      fromEvent(this.employeeInput.nativeElement, "click")
    )
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap(() => {
          const filter = this.employeeInput.nativeElement.value;

          this.filteredEmployees = this.employees.filter(e =>
            e.fullName.toLowerCase().includes(filter)
          );
        })
      )
      .subscribe();
  }

  getEmployeesSelect() {
    this.sub$.add(
      this.employeeService
        .getEmployeesSelect()
        .subscribe((employees: EmployeeSelect[]) => {
          this.employees = this.filteredEmployees = employees;
        })
    );
  }

  createForm() {
    this.formGroup = this.fb.group({
      orderNumber: ["", Validators.required],
      dateOfIssue: ["", Validators.required],
      timeForPayment: ["", Validators.required],
      customerName: [""],
      employee: [""],
      rating: [0]
    });
  }

  updateForm() {
    this.rating = this.parentData.rating;

    this.formGroup.setValue({
      orderNumber: this.parentData.orderNumber,
      dateOfIssue: this.parentData.dateOfIssue,
      timeForPayment: this.parentData.timeForPayment,
      customerName: this.parentData.customerName,
      employee: <EmployeeSelect>{
        employeeId: this.parentData.employeeId,
        fullName: this.parentData.employeeName
      },
      rating: this.parentData.rating
    });
  }

  onSubmit() {
    const tempOrder = <OrderSell>{
      orderId: this.parentData.orderId,
      orderNumber: this.formGroup.value.orderNumber,
      dateOfIssue: this.formGroup.value.dateOfIssue,
      timeForPayment: this.formGroup.value.timeForPayment,
      personId: this.parentData.personId,
      employeeId: this.formGroup.value.employee.employeeId,
      rating: this.formGroup.value.rating
    };

    this.sub$.add(
      this.orderSellService
        .updateOrder(tempOrder)
        .subscribe((res: OrderSell) => {
          if (res) {
            this.dialogRef.close(res);
          } else {
            this.dialogRef.close();
          }
        }, catchError(error => of([error])))
    );
  }

  onCancel() {
    this.dialogRef.close("cancel");
  }

  get(name: string): AbstractControl {
    return this.formGroup.get(name);
  }

  getErrorMessage(name: string, value: string) {
    const control = this.formGroup.get(name);

    return control.hasError("required") ? `${value} is required` : null;
  }

  displayFn(employee: EmployeeSelect): string | undefined {
    return employee ? employee.fullName : undefined;
  }
}
