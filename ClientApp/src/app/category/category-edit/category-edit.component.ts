import { Component, OnInit, Inject } from '@angular/core';
import { CategoryService } from '../_services/category.service';
import { Category } from '../_interfaces/category';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {
  
  category: Category;
  formGroup: FormGroup;

  constructor(private categoryService: CategoryService,
    private fb: FormBuilder,

    // TODO: Get data from main component
    // just testing, must implement on product edit component
    private dialogRef: MatDialogRef<CategoryEditComponent>,
    @Inject(MAT_DIALOG_DATA) data

  ) {

    // TODO: this. specification = data.specification
    

    this.ngOnInit();
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.fb.group({

      // TODO: specification: [specification, []]
      categoryName: []
    });

  }

  onSubmit() {
    const tempCategory = <Category>{};
    tempCategory.categoryName = this.formGroup.value.categoryName;

    this.categoryService.addCategory(tempCategory).subscribe();
  }

  // TODO: use to pass data from dialog to main component
  save() {
    this.dialogRef.close(this.formGroup.value);
  }

  close() {
    this.dialogRef.close();
  }


}
