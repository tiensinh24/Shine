import { Component, OnInit, Inject } from '@angular/core';
import { CategorySell } from 'src/app/_shared/intefaces/sell/category/category-sell';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-category-sell-dialog',
  templateUrl: './category-sell-dialog.component.html',
  styleUrls: ['./category-sell-dialog.component.scss']
})
export class CategorySellDialogComponent implements OnInit {
  title: string;
  editMode: boolean;
  categorySell: CategorySell;
  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CategorySellDialogComponent>,
    // Inject data from main component
    @Inject(MAT_DIALOG_DATA) public data: CategorySell
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
    const tempCategory = <CategorySell>{};
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
