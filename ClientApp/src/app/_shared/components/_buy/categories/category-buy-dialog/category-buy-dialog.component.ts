import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryBuy } from 'src/app/_shared/intefaces/buy/category/category-buy';



@Component({
  selector: 'app-category-buy-dialog',
  templateUrl: './category-buy-dialog.component.html',
  styleUrls: ['./category-buy-dialog.component.css']
})
export class CategoryBuyDialogComponent implements OnInit {
  title: string;
  editMode: boolean;
  categoryBuy: CategoryBuy;
  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CategoryBuyDialogComponent>,
    // Inject data from main component
    @Inject(MAT_DIALOG_DATA) public data: CategoryBuy
  ) {}

  ngOnInit() {
    this.createForm();

    // Check if data isn't null (edit mode)
    if (this.data) {
      this.editMode = true;
      this.title = 'Edit ' + this.data.categoryName;
      this.updateForm();
      // Create mode
    } else {
      this.editMode = false;
      this.title = 'Create new category';
    }
  }

  createForm() {
    this.formGroup = this.fb.group({
      categoryName: ['', Validators.required]
    });
  }

  updateForm() {
    this.formGroup.setValue({
      categoryName: this.data.categoryName
    });
  }

  // Return data to main component
  onSave() {
    const tempCategory = <CategoryBuy>{};
    tempCategory.categoryName = this.formGroup.value.categoryName;

    if (this.editMode) {
      tempCategory.categoryId = this.data.categoryId;
    }

    this.dialogRef.close(tempCategory);
  }

  onCancel() {
    this.dialogRef.close();
  }

  getControllError(formControl: FormControl) {
    return formControl.hasError('required')
      ? 'You must enter a value'
      : formControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }
}
