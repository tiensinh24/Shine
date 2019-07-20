import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Cost } from '../../intefaces/public/cost';
import { CostService } from '../../services/public/cost.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cost-edit-dialog',
  templateUrl: './cost-edit-dialog.component.html',
  styleUrls: ['./cost-edit-dialog.component.scss']
})
export class CostEditDialogComponent implements OnInit, OnDestroy {
  // Subscription
  sub$ = new Subscription();

  // Form
  costForm: FormGroup;

  // title
  title = '';

  constructor(
    private fb: FormBuilder,
    private costService: CostService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CostEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public parentData
  ) {}

  ngOnInit() {
    this.initialize();
  }

  ngOnDestroy() {
    this.sub$.unsubscribe();
  }

  initialize() {
    this.title = `Add cost for order ${this.parentData.orderNumber}`;
    this.createForm();

    if (this.parentData.edit) {
      this.title = `Edit cost for order ${this.parentData.orderNumber}`;
      this.updateForm();
    }
  }

  createForm() {
    this.costForm = this.fb.group({
      costDate: ['', Validators.required],
      description: ['', Validators.required],
      amount: ['', Validators.required],
      currency: [true, Validators.required],
      rate: ['', Validators.required]
    });
  }

  updateForm() {
    this.costForm.setValue({
      costDate: this.parentData.costDate,
      description: this.parentData.description,
      amount: this.parentData.amount,
      currency: this.parentData.currency,
      rate: this.parentData.rate
    });
  }

  onSubmit() {
    const cost = <Cost>{
      orderId: this.parentData.orderId,
      costDate: this.get('costDate').value,
      description: this.get('description').value,
      amount: this.get('amount').value,
      currency: this.get('currency').value,
      rate: this.get('rate').value
    };

    // Edit cost
    if (this.parentData.edit) {
      cost.costId = this.parentData.costId;

      this.sub$.add(
        this.costService.updateCost(cost).subscribe((res: Cost) => {
          if (res) {
            this.snackBar.open('Cost updated', 'Success');

            this.dialogRef.close(res);
          } else {
            this.snackBar.open(`Can't update cost, please try again`, 'Error');
          }
        })
      );
    } else {
      // Add cost
      this.sub$.add(
        this.costService.addCost(cost).subscribe((res: Cost) => {
          if (res) {
            this.snackBar.open('Cost added', 'Success');
            this.dialogRef.close(res);
          } else {
            this.snackBar.open(`Can't add cost, please try again`, 'Error');
          }
        })
      );
    }
  }

  onCancel() {
    this.dialogRef.close('cancel');
  }

  get(name: string): AbstractControl {
    return this.costForm.get(name);
  }

  getErrorMessage(name: string, value: string) {
    const control = this.costForm.get(name);

    return control.hasError('required') ? `${value} is required` : null;
  }
}
