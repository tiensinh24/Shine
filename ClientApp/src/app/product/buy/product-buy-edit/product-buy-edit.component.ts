import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ProductBuyService } from '../_services/product-buy.service';
import { ProductBuy } from '../_interfaces/product-buy';
import { DialogService } from 'src/app/_services/dialog.service';
import { CategoryBuy } from 'src/app/category/buy/_interfaces/categoryBuy';
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
  productBuy: ProductBuy;
  categories: CategoryBuy[];
  formGroup: FormGroup;
  editMode: boolean;
  actButton: boolean;
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
