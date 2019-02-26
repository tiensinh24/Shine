import { OnInit, Inject, Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { CategorySell } from '../../_interfaces/category-sell';
import { CategorySellService } from '../../_services/category-sell.service';

@Component({
  selector: 'app-category-sell-dialog',
  templateUrl: './category-sell-dialog.component.html',
  styleUrls: ['./category-sell-dialog.component.css'],
})
export class CategorySellDialogComponent implements OnInit {
  title = 'Create new category';
  category: CategorySell;
  formGroup: FormGroup;

  constructor(
    private categorySellService: CategorySellService,
    private fb: FormBuilder,
    // TODO: Get data from main component
    // just testing, must implement on product edit component
    private dialogRef: MatDialogRef<CategorySellDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
  ) {
    // TODO: this. specification = data.specification
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.fb.group({
      // TODO: specification: [specification, []]
      categoryName: ['', Validators.required],
    });
  }

  onSubmit() {
    const tempCategory = <CategorySell>{};
    tempCategory.categoryName = this.formGroup.value.categoryName;

    this.categorySellService.addCategory(tempCategory).subscribe();
  }

  // TODO: use to pass data from dialog to main component
  save() {
    this.dialogRef.close(this.formGroup.value);
  }

  close() {
    this.dialogRef.close();
  }
}
