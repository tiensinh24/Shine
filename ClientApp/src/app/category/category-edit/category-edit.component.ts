import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../_services/category.service';
import { Category } from '../_interfaces/category';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {
  category: Category;

  formGroup = new FormGroup({
    categoryId: new FormControl(''),
    categoryName: new FormControl('', Validators.required)
  });

  constructor(private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute) {

      this.ngOnInit();
    }

  ngOnInit() {
    const id = this.activatedRoute.params['id'];

    this.categoryService.getCategory(2).subscribe(result => {
      this.category = result;
    }, error => console.log(error));
  }

  onSubmit(category: Category) {
    this.categoryService.addCategory(category);
  }

}
