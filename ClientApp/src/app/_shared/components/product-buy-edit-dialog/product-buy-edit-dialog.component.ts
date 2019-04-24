import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs';
import { CategoryBuy } from 'src/app/category/buy/_interfaces/category-buy';
import { CategoryBuyService } from 'src/app/category/buy/_services/category-buy.service';
import { ProductBuy } from 'src/app/product/buy/_interfaces/product-buy';
import { ProductBuyService } from 'src/app/product/buy/_services/product-buy.service';
import { environment } from 'src/environments/environment';
import { CategoryBuyDialogComponent } from '../category-buy-dialog/category-buy-dialog.component';

@Component({
  selector: 'app-product-buy-edit-dialog',
  templateUrl: './product-buy-edit-dialog.component.html',
  styleUrls: ['./product-buy-edit-dialog.component.css']
})
export class ProductBuyEditDialogComponent implements OnInit, OnDestroy {
  baseUrl = environment.URL;
  categoriesSub: Subscription;
  categories: CategoryBuy[];
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
    @Inject(MAT_DIALOG_DATA) public dataFromList
  ) {}

  ngOnInit() {
    this.createForm();
    this.getCategories();

    // Edit product
    if (this.dataFromList) {
      this.editMode = true;

      this.title = `Edit ${this.dataFromList.productName}`;
      this.updateForm();
      // Create product
    } else {
      this.editMode = false;
      this.title = 'Create new product';
    }
  }

  ngOnDestroy(): void {
    this.categoriesSub.unsubscribe();
  }

  getCategories() {
    this.categoriesSub = this.categoryBuyService.getCategories().subscribe(res => {
      this.categories = res;
    });
  }

  createForm() {
    this.formGroup = this.fb.group({
      productName: ['', Validators.required],
      specification: ['', Validators.required],
      categoryId: ['', Validators.required]
    });
  }

  updateForm() {
    this.formGroup.setValue({
      productName: this.dataFromList.productName,
      specification: this.dataFromList.specification,
      categoryId: this.dataFromList.categoryId
    });
  }

  // Open add category dialog
  openDialog() {
    const dialogConfig = <MatDialogConfig>{
      disableClose: true,
      autoFocus: true,
      width: '500px',
      height: '320px'
    };

    const dialogRef = this.dialog.open(CategoryBuyDialogComponent, dialogConfig);

    // Get data returned from dialog
    dialogRef.afterClosed().subscribe((data: CategoryBuy) => {
      // Check if data exists
      if (data) {
        this.categoryBuyService.addCategory(data).subscribe((res: CategoryBuy) => {
          // Add new category into categories
          this.categories.push(res);
          // Update formControl with new added value
          this.formGroup.patchValue({
            categoryId: res.categoryId
          });
        });
      }
    });
  }

  onSubmit() {
    const tempProductBuy = <ProductBuy>{};

    tempProductBuy.productName = this.formGroup.value.productName;
    tempProductBuy.specification = this.formGroup.value.specification;
    tempProductBuy.categoryId = this.formGroup.value.categoryId;

    // Edit mode
    if (this.editMode) {
      tempProductBuy.productId = this.dataFromList.productId;
      this.productBuyService.updateProduct(tempProductBuy).subscribe(res => {
        this.dialogRef.close(res);
      });
      // Create mode
    } else {
      this.productBuyService.addProduct(tempProductBuy).subscribe(res => {
        this.dialogRef.close(res);
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

  getFormError(formGroup: FormGroup) {
    return formGroup.getError('auth');
  }
}
