import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { ProductBuyService } from '../_services/product-buy.service';
import { CategoryService } from 'src/app/category/_services/category.service';
import { Category } from 'src/app/category/_interfaces/category';
import { CategoryEditComponent } from 'src/app/category/category-edit/category-edit.component';
import { ProductBuy } from '../_interfaces/product-buy';


@Component({
  selector: 'app-product-buy-edit',
  templateUrl: './product-buy-edit.component.html',
  styleUrls: ['./product-buy-edit.component.css']
})
export class ProductBuyEditComponent implements OnInit {
  baseUrl = environment.URL;
  categories: Category[];
  formGroup: FormGroup;

  constructor(private fb: FormBuilder,
    private productBuyService: ProductBuyService,
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

  onSubmitBuy() {
    const productBuy = <ProductBuy>{};

    productBuy.name = this.formGroup.value.name;
    productBuy.specification = this.formGroup.value.specification;
    productBuy.price = this.formGroup.value.price;
    productBuy.categoryId = this.formGroup.value.categoryId;

    this.productBuyService.addProduct(productBuy).subscribe();
  }
}
