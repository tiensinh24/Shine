import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { fromEvent, merge, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { ProductBuy } from 'src/app/_shared/intefaces/buy/product/product-buy';
import { ProductBuyService } from 'src/app/_shared/services/buy/product-buy.service';
import { environment } from 'src/environments/environment';
import { CategoryBuy } from 'src/app/_shared/intefaces/buy/category/category-buy';
import { CategoryBuyService } from 'src/app/_shared/services/buy/category-buy.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryBuyDialogComponent } from 'src/app/_shared/components/_buy/categories/category-buy-dialog/category-buy-dialog.component';
import { ProductBuyDetail } from 'src/app/_shared/intefaces/buy/product/product-buy-detail';
import { Photo } from 'src/app/_shared/intefaces/public/photo';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-buy-edit',
  templateUrl: './product-buy-edit.component.html',
  styleUrls: ['./product-buy-edit.component.css']
})
export class ProductBuyEditComponent implements OnInit, OnDestroy {
  // Subscriptions
  categories$ = new Subscription();
  product$ = new Subscription();

  // Variables
  categories: CategoryBuy[];
  product: ProductBuyDetail;

  baseUrl = environment.URL;
  productId = +this.route.snapshot.params.productId;
  photoUploadUrl = `${this.baseUrl}api/photo/product/${this.productId}`;
  title: string;

  // photo upload
  photoUploadExpansion = false;

  // Form
  formGroup: FormGroup;
  editMode: boolean;

  // Categories autocomplete
  filteredCategories: CategoryBuy[];
  @ViewChild('categoryInput', { static: true }) categoryInput: ElementRef;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private productBuyService: ProductBuyService,
    private categoryBuyService: CategoryBuyService
  ) {}

  ngOnInit() {
    this.initialize();
  }

  ngOnDestroy(): void {
    this.categories$.unsubscribe();
    this.product$.unsubscribe();
  }

  initialize() {
    this.createForm();
    this.getCategories();

    // Edit product
    if (this.productId) {
      this.editMode = true;

      // Get product & update form
      this.getProduct(this.productId);
    } else {
      this.editMode = false;
      this.title = 'New product';
    }

    // Filter category autocomplete
    merge(fromEvent(this.categoryInput.nativeElement, 'keyup'), fromEvent(this.categoryInput.nativeElement, 'click'))
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap(() => {
          const filter = this.categoryInput.nativeElement.value;

          this.filteredCategories = this.categories.filter(c => c.categoryName.toLowerCase().includes(filter));
        })
      )
      .subscribe();
  }

  getCategories() {
    this.categories$ = this.categoryBuyService.getCategories().subscribe(res => {
      this.categories = res;
      this.filteredCategories = res;
    });
  }

  getProduct(productId: number) {
    this.product$ = this.productBuyService.getProduct(productId).subscribe((res: ProductBuyDetail) => {
      this.product = res;

      this.title = `Edit ${res.productName}`;

      this.updateForm(res);
    });
  }

  createForm() {
    this.formGroup = this.fb.group({
      productName: [''],
      specification: [''],
      category: ['']
    });
  }

  updateForm(product: ProductBuy) {
    this.formGroup.setValue({
      productName: product.productName,
      specification: product.specification,
      category: <CategoryBuy>{
        categoryId: product.categoryId,
        categoryName: this.categories.find(c => c.categoryId === product.categoryId).categoryName
      }
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
            category: res
          });
        });
      }
    });
  }

  onSubmit() {
    const tempProductBuy = <ProductBuy>{};

    tempProductBuy.productName = this.formGroup.value.productName;
    tempProductBuy.specification = this.formGroup.value.specification;
    tempProductBuy.categoryId = this.formGroup.value.category.categoryId;

    // Edit mode
    if (this.editMode) {
      tempProductBuy.productId = this.productId;

      this.productBuyService.updateProduct(tempProductBuy).subscribe((res: ProductBuy) => {
        if (res) {
          this.snackBar.open('Product has been updated', 'Success');
        } else {
          this.snackBar.open('Update failed, please try again', 'Error');
        }
      });
      // Create mode
    } else {
      this.productBuyService.addProduct(tempProductBuy).subscribe((res: ProductBuy) => {
        if (res) {
          this.router.navigate(['/admin/product-buy/edit/', res.productId]);
          this.snackBar.open('Product created', 'Success');
        } else {
          this.snackBar.open(`Can't create product, please try again`, 'Error');
        }
      });
    }
  }

  onCancel() {
    this.updateForm(this.product);
  }

  get(name: string): AbstractControl {
    return this.formGroup.get(name);
  }

  getErrorMessage(formControl: FormControl) {
    return formControl.hasError('required') ? 'You must enter a value' : formControl.hasError('email') ? 'Not a valid email' : formControl.hasError('pattern') ? 'Please enter a number!' : '';
  }

  displayFn(category: CategoryBuy): string | undefined {
    return category ? category.categoryName : undefined;
  }

  refreshPhotoUpload(event: Photo) {
    this.product.photos.push(event);
  }

  togglePhotoUploadExpansion() {
    this.photoUploadExpansion = !this.photoUploadExpansion;
  }
}
