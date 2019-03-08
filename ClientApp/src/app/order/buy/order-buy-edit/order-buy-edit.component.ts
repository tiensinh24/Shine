import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { OrderBuyService } from '../_services/order-buy.service';
import { OrderBuyDto } from '../_interfaces/order-buy-dto';
import { SupplierDto } from 'src/app/supplier/_interfaces/supplier-dto';
import { SupplierService } from 'src/app/supplier/_services/supplier.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-buy-edit',
  templateUrl: './order-buy-edit.component.html',
  styleUrls: ['./order-buy-edit.component.css']
})
export class OrderBuyEditComponent implements OnInit, OnDestroy {
  orderSub: Subscription;
  suppliersSub: Subscription;

  title: string;
  editMode = false;
  formGroup: FormGroup;
  order: OrderBuyDto;
  suppliers: SupplierDto[];

  constructor(private orderService: OrderBuyService,
    private supplierService: SupplierService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { }

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
      personId: ['', Validators.required]
    });
  }

  updateForm() {
    this.formGroup.setValue({
      orderNumber: this.order.orderNumber,
      dateOfIssue: this.order.dateOfIssue,
      timeForPayment: this.order.timeForPayment,
      personId: this.order.personId
    });
  }

  getOrder(orderId: number) {
    this.orderSub = this.orderService.getOrder(orderId).subscribe(res => {
      this.order = res;
    });
  }

  getSuppliers() {
    this.suppliersSub = this.supplierService.getSuppliers().subscribe(res => {
      this.suppliers = res;
    });
  }

  // TODO: write this method
  onSubmit() {
    // const tempOrder = <OrderBuy>{};

    // tempOrder.firstName = this.formGroup.value.firstName;
    // tempOrder.lastName = this.formGroup.value.lastName;
    // tempOrder.gender = this.formGroup.value.gender;
    // tempOrder.dateOfBirth = this.formGroup.value.dateOfBirth;
    // tempOrder.personNumber = this.formGroup.value.personNumber;
    // tempOrder.telephone = this.formGroup.value.telephone;
    // tempOrder.fax = this.formGroup.value.fax;
    // tempOrder.countryId = this.formGroup.value.countryId;

    // if (this.editMode) {
    //   tempOrder.personId = this.dataFromList.personId;
    //   this.supplierService.updateSupplier(tempOrder).subscribe(res => {
    //     this.dialogRef.close(res);
    //   });
    // } else {
    //   this.supplierService.addSupplier(tempOrder).subscribe(res => {
    //     this.dialogRef.close(res);
    //   });
    // }
  }

  onCancel() {
    this.router.navigate(['order-buy']);
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
