import { OnInit, Inject, Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { CategoryBuy } from '../../_interfaces/categoryBuy';
import { CategoryBuyService } from '../../_services/category-buy.service';

@Component({
  selector: 'app-category-buy-dialog',
  templateUrl: './category-buy-dialog.component.html',
  styleUrls: ['./category-buy-dialog.component.css']
})
export class CategoryBuyDialogComponent implements OnInit {
  title = 'Create new category';
  category: CategoryBuy;
  formGroup: FormGroup;

  constructor(private categoryBuyService: CategoryBuyService,
    private fb: FormBuilder,

    // TODO: Get data from main component
    // just testing, must implement on product edit component
    private dialogRef: MatDialogRef<CategoryBuyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data

  ) {

    // TODO: this. specification = data.specification

  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.fb.group({

      // TODO: specification: [specification, []]
      categoryName: ['', Validators.required]
    });

  }

  onSubmit() {
    const tempCategory = <CategoryBuy>{};
    tempCategory.categoryName = this.formGroup.value.categoryName;

    this.categoryBuyService.addCategory(tempCategory).subscribe();
  }

  // TODO: use to pass data from dialog to main component
  save() {
    this.dialogRef.close(this.formGroup.value);
  }

  close() {
    this.dialogRef.close();
  }


}
