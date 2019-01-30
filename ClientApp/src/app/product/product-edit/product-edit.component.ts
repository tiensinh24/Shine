import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { ProductService } from '../_services/product.service';
import { ProductSell } from '../_interfaces/product-sell';
import { CategoryService } from 'src/app/category/_services/category.service';
import { Category } from 'src/app/category/_interfaces/category';
import { CategoryEditComponent } from 'src/app/category/category-edit/category-edit.component';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  baseUrl = environment.URL;
  categories: Category[];
  formGroup: FormGroup;

  constructor(private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private http: HttpClient) {

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

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    // TODO: Pass data from main component to dialog
    // use to edit value (product)
    // dialogConfig.data = {
    //   name: 'exp',
    //   specification: 'exp'
    //   ...
    // };

    // this.dialog.open(CategoryEditComponent, dialogConfig);

    // TODO: pass data from dialog in to main component
    const dialogRef = this.dialog.open(CategoryEditComponent, dialogConfig);
    
    dialogRef.afterClosed().subscribe(data => {
      this.http.post<Category>(this.baseUrl + 'api/category', data).subscribe();
      console.log(data);
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
