import { Component, OnInit, Inject } from '@angular/core';
import { CategoryService } from '../_services/category.service';
import { Category } from '../_interfaces/category';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {
  category: Category;
  formGroup: FormGroup;

  constructor(private categoryService: CategoryService,
    private fb: FormBuilder
  ) {

    this.ngOnInit();
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.fb.group({
      categoryName: []
    });

  }

  onSubmit() {
    const tempCategory = <Category>{};
    tempCategory.categoryName = this.formGroup.value.categoryName;

    this.categoryService.addCategory(tempCategory).subscribe();
  }

}
