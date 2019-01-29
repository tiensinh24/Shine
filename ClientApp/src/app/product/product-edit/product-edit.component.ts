import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductService } from '../_services/product.service';
import { Product } from '../_interfaces/product';
import { CategoryService } from 'src/app/category/_services/category.service';
import { Category } from 'src/app/category/_interfaces/category';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  product: Product;
  categories: Category[];

  formGroup = new FormGroup({
    name: new FormControl(''),
    specification: new FormControl(''),
    price: new FormControl(''),
    productType: new FormControl(''),
    categoryId: new FormControl('')
  });

  constructor(private productService: ProductService,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute) {

    this.ngOnInit();
  }


  ngOnInit() {
    const id = this.activatedRoute.params['id'];

    this.productService.getProduct(2).subscribe(result => {
      this.product = result;
    }, error => console.error(error));

    this.categoryService.getCategories().subscribe(result => {
      this.categories = result;
    }, error => console.error(error));
  }

  onSubmit(product: Product) {
    this.productService.onSubmit(product);
  }

}
