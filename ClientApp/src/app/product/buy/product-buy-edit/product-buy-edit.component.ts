import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { environment } from 'src/environments/environment';
import { ProductBuyService } from '../_services/product-buy.service';
import { ProductBuy } from '../_interfaces/product-buy';
import { Observable } from 'rxjs';
import { DialogService } from 'src/app/_services/dialog.service';
import { CategoryBuy } from 'src/app/category/buy/_interfaces/categoryBuy';
import { CategoryBuyService } from 'src/app/category/buy/_services/category-buy.service';
import { CategoryBuyDialogComponent } from 'src/app/category/buy/_dialogs/category-buy-dialog/category-buy-dialog.component';

@Component({
  selector: 'app-product-buy-edit',
  templateUrl: './product-buy-edit.component.html',
  styleUrls: ['./product-buy-edit.component.css']
})
export class ProductBuyEditComponent implements OnInit {
  baseUrl = environment.URL;
  productBuy: ProductBuy;
  categories: CategoryBuy[];
  formGroup: FormGroup;
  editMode: boolean;
  actButton: boolean;
  title: string;

  constructor(private fb: FormBuilder,
    private productBuyService: ProductBuyService,
    private categoryBuyService: CategoryBuyService,
    private dialogService: DialogService,
    private dialog: MatDialog,
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
      this.title = 'Create new product';
    }
  }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categoryBuyService.getCategoryList().subscribe(result => {
      this.categories = result;
    });
  }

  createForm() {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      specification: ['', Validators.required],
      price: ['',
        [
          Validators.required,
          Validators.pattern('[0-9.]*')
        ]
      ],
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
    dialogConfig.minWidth = '400px';
    dialogConfig.minHeight = '250px';

    // TODO: Pass data from main component to dialog
    // use to edit value (product)
    // dialogConfig.data = {
    //   name: 'exp',
    //   specification: 'exp'
    //   ...
    // };

    // this.dialog.open(CategoryBuyEditComponent, dialogConfig);

    // TODO: pass data from dialog in to main component
    const dialogRef = this.dialog.open(CategoryBuyDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data: CategoryBuy) => {
      this.categoryBuyService.addCategory(data).subscribe();
      this.getCategories();
    });
  }

  onSubmit() {
    this.actButton = true;
    const tempProductBuy = <ProductBuy>{};

    tempProductBuy.name = this.formGroup.value.name;
    tempProductBuy.specification = this.formGroup.value.specification;
    tempProductBuy.price = this.formGroup.value.price;
    tempProductBuy.categoryId = this.formGroup.value.categoryId;

    if (this.editMode) {
      tempProductBuy.productId = this.productBuy.productId;
      this.productBuyService.updateProduct(tempProductBuy).subscribe(() => {
        this.router.navigate(['product-buy/list']);
      });
    } else {
      this.productBuyService.addProduct(tempProductBuy).subscribe(() => {
        this.router.navigate(['/product-buy/list']);
      });
    }
  }

  onBack() {
    this.actButton = true;
    this.router.navigate(['/product-buy/list']);
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (!this.actButton) {
      if (this.formGroup.dirty) {
        return this.dialogService.confirm('Discard changes?');
      }
    }
    return true;
  }

  get(name: string): AbstractControl {
    return this.formGroup.get(name);
  }

  getErrorMessage(formControl: FormControl) {
    return formControl.hasError('required') ? 'You must enter a value' :
      formControl.hasError('email') ? 'Not a valid email' :
        formControl.hasError('pattern') ? 'Please enter a number!' : '';
  }

}
