import { Component, OnInit, Inject } from '@angular/core';
import { CategoryBuyService } from '../_services/category-buy.service';
import { CategoryBuy } from '../_interfaces/categoryBuy';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-category-buy-edit',
  templateUrl: './category-buy-edit.component.html',
  styleUrls: ['./category-buy-edit.component.css']
})
export class CategoryBuyEditComponent implements OnInit {
  title = 'Create new category';
  category: CategoryBuy;
  formGroup: FormGroup;

  constructor(private categoryBuyService: CategoryBuyService,
    private fb: FormBuilder,

    // TODO: Get data from main component
    // just testing, must implement on product edit component
    private dialogRef: MatDialogRef<CategoryBuyEditComponent>,
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

    this.categoryBuyService.addCategoryBuy(tempCategory).subscribe();
  }

  // TODO: use to pass data from dialog to main component
  save() {
    this.dialogRef.close(this.formGroup.value);
  }

  close() {
    this.dialogRef.close();
  }


}
