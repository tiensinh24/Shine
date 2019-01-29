import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductService } from '../_services/product.service';
import { ProductSell } from '../_interfaces/product-sell';
import { CategoryService } from 'src/app/category/_services/category.service';
import { Category } from 'src/app/category/_interfaces/category';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ProductBuy } from '../_interfaces/product-buy';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  product: ProductSell;
  categories: Category[];

  formGroup = this.fb.group({
    name: [''],
    specification: [''],
    price: [0],
    categoryId: [0]
  });

  constructor(private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute) {

    this.ngOnInit();
  }

  ngOnInit() {
    const id = this.activatedRoute.params['id'];

    this.productService.getProductBuy(id).subscribe(result => {
      this.product = result;
    }, error => console.log(error));

    this.categoryService.getCategories().subscribe(result => {
      this.categories = result;
    }, error => console.log(error));
  }

  onSubmitSell(productSell: ProductSell) {
    this.productService.onSubmitSell(productSell);
  }

  onSubmitBuy() {
    this.productService.onSubmitBuy(this.formGroup.value);
  }

}
