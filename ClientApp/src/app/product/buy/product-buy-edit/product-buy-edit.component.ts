import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ProductBuyService } from '../_services/product-buy.service';
import { ProductBuy } from '../_interfaces/product-buy';
import { DialogService } from 'src/app/_services/dialog.service';
import { CategoryBuy } from 'src/app/category/buy/_interfaces/category-buy';
import { CategoryBuyService } from 'src/app/category/buy/_services/category-buy.service';
import { CategoryBuyDialogComponent } from 'src/app/_shared/components/category-buy-dialog/category-buy-dialog.component';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-product-buy-edit',
  templateUrl: './product-buy-edit.component.html',
  styleUrls: ['./product-buy-edit.component.css']
})
export class ProductBuyEditComponent implements OnInit, OnDestroy {
  baseUrl = environment.URL;
  productBuy = <ProductBuy>{};
  categories: CategoryBuy[];
  formGroup: FormGroup;
  editMode: boolean;
  canDeactive: boolean;
  title: string;
  routeSub: Subscription;

  constructor(private fb: FormBuilder,
    private productBuyService: ProductBuyService,
    private categoryBuyService: CategoryBuyService,
    private dialogService: DialogService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.createForm();

    const id = +this.route.snapshot.params.productId;

    if (id) {
      this.editMode = true;

      // *Get product, categories from list component without calling API
      this.routeSub = this.route.paramMap.pipe(map(() => window.history.state))
      .subscribe(res => {
        this.productBuy = res.product;
        this.categories = res.categories;
      });
      this.title = `Edit ${this.productBuy.name}`;
      this.updateForm();
    } else {
      this.editMode = false;

      // *Get categories from list component without calling API
      this.routeSub = this.route.paramMap.pipe(map(() => window.history.state))
      .subscribe(res => {
        this.categories = res.categories;
      });
      this.title = 'Create new product';
    }
  }

  // Destroy all subscription
  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  createForm() {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      specification: ['', Validators.required],
      categoryId: ['', Validators.required]
    });
  }

  updateForm() {
    this.formGroup.setValue({
      name: this.productBuy.name,
      specification: this.productBuy.specification,
      categoryId: this.productBuy.categoryId
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

    const dialogRef = this.dialog.open(CategoryBuyDialogComponent, dialogConfig);

    // *Get data returned from dialog
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
    this.canDeactive = true;
    const tempProductBuy = <ProductBuy>{};

    tempProductBuy.name = this.formGroup.value.name;
    tempProductBuy.specification = this.formGroup.value.specification;
    tempProductBuy.categoryId = this.formGroup.value.categoryId;

    // Edit mode
    if (this.editMode) {
      tempProductBuy.productId = this.productBuy.productId;
      this.productBuyService.updateProduct(tempProductBuy).subscribe(() => {
        // Navigate back & return data to list
        this.router.navigateByUrl('/product-buy/list', { state: {data: tempProductBuy} });
      });
    // Create mode
    } else {
      this.productBuyService.addProduct(tempProductBuy).subscribe(res => {
        // Navigate back & return data to list
        this.router.navigateByUrl('/product-buy/list', {state: {data: res}});
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
    return formControl.hasError('required') ? 'You must enter a value' :
      formControl.hasError('email') ? 'Not a valid email' :
        formControl.hasError('pattern') ? 'Please enter a number!' : '';
  }

}
