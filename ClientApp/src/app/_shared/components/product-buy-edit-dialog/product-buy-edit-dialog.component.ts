import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  FormControl,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material';

import { ProductBuy } from 'src/app/product/buy/_interfaces/product-buy';
import { CategoryBuy } from 'src/app/category/buy/_interfaces/categoryBuy';
import { environment } from 'src/environments/environment';
import { ProductBuyService } from 'src/app/product/buy/_services/product-buy.service';
import { CategoryBuyService } from 'src/app/category/buy/_services/category-buy.service';
import { CategoryBuyDialogComponent } from '../category-buy-dialog/category-buy-dialog.component';
import { ProductBuyListDto } from 'src/app/product/buy/_interfaces/productBuyListDto';

@Component({
  selector: 'app-product-buy-edit-dialog',
  templateUrl: './product-buy-edit-dialog.component.html',
  styleUrls: ['./product-buy-edit-dialog.component.css'],
})
export class ProductBuyEditDialogComponent implements OnInit, OnDestroy {
  baseUrl = environment.URL;
  categories = <CategoryBuy[]>{};
  formGroup: FormGroup;
  editMode: boolean;
  title: string;

  constructor(
    private fb: FormBuilder,
    private productBuyService: ProductBuyService,
    private categoryBuyService: CategoryBuyService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ProductBuyEditDialogComponent>,
    // Inject data from product-buy-list component
    @Inject(MAT_DIALOG_DATA) public dataFromList,
  ) {}

  ngOnInit() {
    this.createForm();

    // Edit product
    if (this.dataFromList.name) {
      this.editMode = true;

      this.title = `Edit ${this.dataFromList.name}`;
      this.updateForm();
      // Create product
    } else {
      this.editMode = false;
      this.title = 'Create new product';
    }
    // Get categories from list component without calling API
    this.categories = this.dataFromList.categories;
  }

  // Destroy all subscription
  ngOnDestroy(): void {}

  createForm() {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      specification: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern('[0-9.]*')]],
      categoryId: ['', Validators.required],
    });
  }

  updateForm() {
    this.formGroup.setValue({
      name: this.dataFromList.name,
      specification: this.dataFromList.specification,
      price: this.dataFromList.price,
      categoryId: this.dataFromList.categoryId,
    });
  }

  // Open add category dialog
  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    // Width & height
    dialogConfig.maxWidth = '100vw';
    dialogConfig.maxHeight = '100vh';
    dialogConfig.minWidth = '80%';
    dialogConfig.height = '80%';

    const dialogRef = this.dialog.open(
      CategoryBuyDialogComponent,
      dialogConfig,
    );

    // Get data returned from dialog
    dialogRef.afterClosed().subscribe((data: CategoryBuy) => {
      // Check if data exists
      if (data) {
        this.categoryBuyService
          .addCategory(data)
          .subscribe((res: CategoryBuy) => {
            // Add new category into categories
            this.categories.push(res);
            // Update formControl with new added value
            this.formGroup.patchValue({
              categoryId: res.categoryId,
            });
          });
      }
    });
  }

  onSubmit() {
    // this.canDeactive = true;
    const tempProductBuy = <ProductBuy>{};

    tempProductBuy.name = this.formGroup.value.name;
    tempProductBuy.specification = this.formGroup.value.specification;
    tempProductBuy.price = this.formGroup.value.price;
    tempProductBuy.categoryId = this.formGroup.value.categoryId;

    // Edit mode
    if (this.editMode) {
      tempProductBuy.productId = this.dataFromList.productId;
      this.productBuyService.updateProduct(tempProductBuy).subscribe(res => {
        // Get new product from API & return it to list component
        const category = this.categories.find(
          c => c.categoryId === res.categoryId,
        );
        const response = <ProductBuyListDto>res;
        response.categoryName = category.categoryName;
        this.dialogRef.close(response);
      });
      // Create mode
    } else {
      this.productBuyService.addProduct(tempProductBuy).subscribe(res => {
        // Get new product from API & return it to list component
        const category = this.categories.find(
          c => c.categoryId === res.categoryId,
        );
        const response = <ProductBuyListDto>res;
        response.categoryName = category.categoryName;
        this.dialogRef.close(response);
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  get(name: string): AbstractControl {
    return this.formGroup.get(name);
  }

  getErrorMessage(formControl: FormControl) {
    return formControl.hasError('required')
      ? 'You must enter a value'
      : formControl.hasError('email')
      ? 'Not a valid email'
      : formControl.hasError('pattern')
      ? 'Please enter a number!'
      : '';
  }
}
