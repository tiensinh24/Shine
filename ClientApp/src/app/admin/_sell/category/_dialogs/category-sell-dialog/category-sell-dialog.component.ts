import { OnInit, Inject, Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategorySell } from 'src/app/_shared/intefaces/sell/category/category-sell';
import { CategorySellService } from 'src/app/_shared/services/sell/category-sell.service';


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
    private dialogRef: MatDialogRef<CategorySellDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
  ) {
   
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.fb.group({
      
      categoryName: ['', Validators.required],
    });
  }

  onSubmit() {
    const tempCategory = <CategorySell>{};
    tempCategory.categoryName = this.formGroup.value.categoryName;

    this.categorySellService.addCategory(tempCategory).subscribe();
  }

  
  save() {
    this.dialogRef.close(this.formGroup.value);
  }

  close() {
    this.dialogRef.close();
  }
}
