import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ProductBuy } from 'src/app/product/buy/_interfaces/product-buy';
import { CategoryBuy } from 'src/app/category/buy/_interfaces/categoryBuy';
import { environment } from 'src/environments/environment';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  FormControl,
} from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { ProductBuyService } from 'src/app/product/buy/_services/product-buy.service';
import { CategoryBuyService } from 'src/app/category/buy/_services/category-buy.service';
import { DialogService } from 'src/app/_services/dialog.service';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { CategoryBuyDialogComponent } from '../category-buy-dialog/category-buy-dialog.component';

@Component({
  selector: 'app-product-buy-edit-dialog',
  templateUrl: './product-buy-edit-dialog.component.html',
  styleUrls: ['./product-buy-edit-dialog.component.css'],
})
export class ProductBuyEditDialogComponent implements OnInit, OnDestroy {
  baseUrl = environment.URL;
  productBuy = <ProductBuy>{};
  categories: CategoryBuy[];
  formGroup: FormGroup;
  editMode: boolean;
  canDeactive: boolean;
  title: string;
  routeSub: Subscription;

  constructor(
    private fb: FormBuilder,
    private productBuyService: ProductBuyService,
    private categoryBuyService: CategoryBuyService,
    private dialogService: DialogService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<ProductBuyEditDialogComponent>,
    // Inject data from product-buy-list component
    @Inject(MAT_DIALOG_DATA) public dataFromList,
  ) {}

  ngOnInit() {
    this.createForm();

    // Edit product
    if (this.dataFromList) {
      this.editMode = true;

      this.title = `Edit ${this.productBuy.name}`;
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
  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  getProduct() {
    this.productBuy.productId = this.dataFromList.productId;
    this.productBuy.name = this.dataFromList.name;
    this.productBuy.specification = this.dataFromList.specification;
    this.productBuy.price = this.dataFromList.price;
    this.productBuy.categoryId = this.dataFromList.categoryId;
  }

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
      name: this.productBuy.name,
      specification: this.productBuy.specification,
      price: this.productBuy.price,
      categoryId: this.productBuy.categoryId,
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

    // *Get data returned from dialog
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
    this.canDeactive = true;
    const tempProductBuy = <ProductBuy>{};

    tempProductBuy.name = this.formGroup.value.name;
    tempProductBuy.specification = this.formGroup.value.specification;
    tempProductBuy.price = this.formGroup.value.price;
    tempProductBuy.categoryId = this.formGroup.value.categoryId;

    // Edit mode
    if (this.editMode) {
      tempProductBuy.productId = this.productBuy.productId;
      this.productBuyService.updateProduct(tempProductBuy).subscribe(() => {
        // Navigate back & return data to list
        this.router.navigateByUrl('/product-buy/list', {
          state: { data: tempProductBuy },
        });
      });
      // Create mode
    } else {
      this.productBuyService.addProduct(tempProductBuy).subscribe(res => {
        // Navigate back & return data to list
        this.router.navigateByUrl('/product-buy/list', {
          state: { data: res },
        });
      });
    }
  }

  // Return data = 0 to product list
  onBack() {
    this.canDeactive = true;
    this.router.navigateByUrl('/product-buy/list', { state: { data: 0 } });
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (!this.canDeactive) {
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
    return formControl.hasError('required')
      ? 'You must enter a value'
      : formControl.hasError('email')
      ? 'Not a valid email'
      : formControl.hasError('pattern')
      ? 'Please enter a number!'
      : '';
  }
}
