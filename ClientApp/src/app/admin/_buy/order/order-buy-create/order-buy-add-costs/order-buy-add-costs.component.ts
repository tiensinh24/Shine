import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { Cost } from 'src/app/_shared/intefaces/public/cost';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-buy-add-costs',
  templateUrl: './order-buy-add-costs.component.html',
  styleUrls: ['./order-buy-add-costs.component.scss']
})
export class OrderBuyAddCostsComponent implements OnInit, OnDestroy {
  costForm: FormGroup;
  costsToAdd: Cost[] = [];

  @Output() costs = new EventEmitter<Cost[]>();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.createForm();
  }

  ngOnDestroy() {}

  createForm() {
    this.costForm = this.fb.group({
      costDate: ['', { updateOn: 'submit' }, Validators.required],
      description: ['', { updateOn: 'submit' }, Validators.required],
      amount: ['', { updateOn: 'submit' }, Validators.required],
      currency: [true, { updateOn: 'submit' }, Validators.required],
      rate: ['', { updateOn: 'submit' }, Validators.required]
    });
  }

  addCost() {
    if (this.costForm.valid) {
      const cost = <Cost>{
        costDate: this.costForm.value.costDate,
        description: this.costForm.value.description,
        amount: this.costForm.value.amount,
        currency: this.costForm.value.currency,
        rate: this.costForm.value.rate
      };

      this.costsToAdd.push(cost);
      this.outCosts();
    }
  }

  removeCost(cost: Cost) {
    const index = this.costsToAdd.findIndex(c => c === cost);

    if (index > -1) {
      this.costsToAdd.splice(index, 1);
      this.outCosts();
    }
  }

  private outCosts() {
    this.costs.emit(this.costsToAdd);
  }

  get(name: string): AbstractControl {
    return this.costForm.get(name);
  }

  getErrorMessage(name: string, value: string) {
    const control = this.costForm.get(name);

    return control.getError('required') ? `${value} is required` : null;
  }
}
