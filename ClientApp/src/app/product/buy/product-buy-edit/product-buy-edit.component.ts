import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

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
  productBuy: ProductBuy;
  categories: Category[];
  formGroup: FormGroup;
  editMode: boolean;
  title: string;

  constructor(private fb: FormBuilder,
    private productBuyService: ProductBuyService,
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute) {

    this.createForm();

    const id = +this.route.snapshot.params.productId;

    if (id) {
      this.editMode = true;

      this.productBuyService.getProduct(id).subscribe(result => {
        this.productBuy = result;
        this.title = 'Edit ' + this.productBuy.name;

        this.updateForm();
        });
    } else {
      this.editMode = false;
      this.title = 'Create a new product';
    }
  }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(result => {
      this.categories = result;
    });

  }

  createForm() {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      specification: ['', Validators.required],
      price: ['', Validators.required],
      categoryId: ['', Validators.required]
    });
  }

  updateForm() {
    this.formGroup.setValue({
      name: this.productBuy.name,
      specification: this.productBuy.specification,
      price: this.productBuy.price,
      categoryId: this.productBuy.categoryId
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
    });
  }

  onSubmit() {
    const tempProductBuy = <ProductBuy>{};

    tempProductBuy.name = this.formGroup.value.name;
    tempProductBuy.specification = this.formGroup.value.specification;
    tempProductBuy.price = this.formGroup.value.price;
    tempProductBuy.categoryId = this.formGroup.value.categoryId;

    if (this.editMode) {
      tempProductBuy.productId = this.productBuy.productId;
      this.productBuyService.updateProduct(tempProductBuy).subscribe(res => {
        this.router.navigate(['product-buy/list']);
      });
    } else {
      this.productBuyService.addProduct(tempProductBuy).subscribe(res => {
        this.router.navigate(['/product-buy/list']);
      });
    }
  }

  onBack() {
    this.router.navigate(['/product-buy/list']);
  }


}
