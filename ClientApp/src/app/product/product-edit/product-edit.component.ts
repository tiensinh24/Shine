import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { ProductService } from '../_services/product.service';
import { ProductSell } from '../_interfaces/product-sell';
import { CategoryService } from 'src/app/category/_services/category.service';
import { Category } from 'src/app/category/_interfaces/category';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  categories: Category[];
  formGroup: FormGroup;

  constructor(private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService) {

    this.ngOnInit();
    this.createForm();
  }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(result => {
      this.categories = result;
    }, error => console.log(error));
  }

  createForm() {
    this.formGroup = this.fb.group({
      name: [],
      specification: [],
      price: [],
      categoryId: []
    });
  }

  onSubmitSell() {
    const productSell = <ProductSell>{};

    productSell.name = this.formGroup.value.name;
    productSell.specification = this.formGroup.value.specification;
    productSell.price = this.formGroup.value.price;
    productSell.categoryId = this.formGroup.value.categoryId;

    this.productService.onSubmitSell(productSell).subscribe();
  }

  onSubmitBuy() {
    const productBuy = <ProductSell>{};

    productBuy.name = this.formGroup.value.name;
    productBuy.specification = this.formGroup.value.specification;
    productBuy.price = this.formGroup.value.price;
    productBuy.categoryId = this.formGroup.value.categoryId;

    this.productService.onSubmitBuy(productBuy).subscribe();
  }
}
