import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef
} from "@angular/core";
import { FormGroup, FormBuilder, AbstractControl } from "@angular/forms";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription, merge, fromEvent } from "rxjs";
import { ProductSell } from "../../../../_shared/intefaces/sell/product/product-sell";
import { environment } from "src/environments/environment";
import { ProductSellService } from "../../../../_shared/services/sell/product-sell.service";
import { CategorySell } from "src/app/_shared/intefaces/sell/category/category-sell";
import { CategorySellService } from "src/app/_shared/services/sell/category-sell.service";
import { CategorySellDialogComponent } from "../../category/_dialogs/category-sell-dialog/category-sell-dialog.component";
import { ProductSellDetail } from "src/app/_shared/intefaces/sell/product/ProductSellDetail";
import { MatSnackBar } from "@angular/material/snack-bar";
import { PhotoService } from "src/app/_shared/services/public/photo.service";
import { debounceTime, distinctUntilChanged, tap } from "rxjs/operators";
import { Photo } from "src/app/_shared/intefaces/public/photo";
import { PhotoForProduct } from "src/app/_shared/intefaces/public/photo-for-product";

@Component({
  selector: "app-product-sell-edit",
  templateUrl: "./product-sell-edit.component.html",
  styleUrls: ["./product-sell-edit.component.css"]
})
export class ProductSellEditComponent implements OnInit, OnDestroy {
  // Subscriptions
  categories$ = new Subscription();
  product$ = new Subscription();
  photo$ = new Subscription();

  // Variables
  categories: CategorySell[];
  product: ProductSellDetail;

  baseUrl = environment.URL;
  productId = +this.route.snapshot.params.productId;

  title: string;

  // photo upload
  photoUploadExpansion = false;
  photoUploadUrl = `${this.baseUrl}api/photo/product/${this.productId}`;

  // Form
  formGroup: FormGroup;
  editMode: boolean;

  // Categories autocomplete
  filteredCategories: CategorySell[];
  @ViewChild("categoryInput", { static: true }) categoryInput: ElementRef;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private productSellService: ProductSellService,
    private categorySellService: CategorySellService,
    private photoService: PhotoService
  ) {}

  ngOnInit() {
    this.initialize();
  }

  ngOnDestroy(): void {
    this.categories$.unsubscribe();
    this.product$.unsubscribe();
    this.photo$.unsubscribe();
  }

  initialize() {
    this.getCategories();
    this.createForm();

    // Edit product
    if (this.productId) {
      this.editMode = true;

      // Get product & update form
      this.getProduct(this.productId);
    } else {
      this.editMode = false;
      this.title = "New product";
    }

    // Filter category autocomplete
    merge(
      fromEvent(this.categoryInput.nativeElement, "keyup"),
      fromEvent(this.categoryInput.nativeElement, "click")
    )
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap(() => {
          const filter = this.categoryInput.nativeElement.value;

          this.filteredCategories = this.categories.filter(c =>
            c.categoryName.toLowerCase().includes(filter)
          );
        })
      )
      .subscribe();
  }

  getCategories() {
    this.categories$ = this.categorySellService
      .getCategories()
      .subscribe(res => {
        this.categories = res;
        this.filteredCategories = res;
      });
  }

  getProduct(productId: number) {
    this.product$ = this.productSellService
      .getProduct(productId)
      .subscribe((res: ProductSellDetail) => {
        this.product = res;

        this.title = `Edit ${res.productName}`;

        this.updateForm(res);
      });
  }

  createForm() {
    this.formGroup = this.fb.group({
      productName: [""],
      specification: [""],
      category: [""]
    });
  }

  updateForm(product: ProductSellDetail) {
    this.formGroup.setValue({
      productName: product.productName,
      specification: product.specification,
      category: <CategorySell>{
        categoryId: product.categoryId,
        categoryName: this.product.categoryName
      }
    });
  }

  // Open add category dialog
  openDialog() {
    const dialogConfig = <MatDialogConfig>{
      disableClose: true,
      autoFocus: true,
      width: "500px",
      height: "320px"
    };

    const dialogRef = this.dialog.open(
      CategorySellDialogComponent,
      dialogConfig
    );

    // Get data returned from dialog
    dialogRef.afterClosed().subscribe((data: CategorySell) => {
      // Check if data exists
      if (data) {
        this.categorySellService
          .addCategory(data)
          .subscribe((res: CategorySell) => {
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
    const tempProduct = <ProductSell>{};

    tempProduct.productName = this.formGroup.value.productName;
    tempProduct.specification = this.formGroup.value.specification;
    tempProduct.categoryId = this.formGroup.value.category.categoryId;

    // Edit mode
    if (this.editMode) {
      tempProduct.productId = this.productId;

      this.productSellService
        .updateProduct(tempProduct)
        .subscribe((res: ProductSell) => {
          if (res) {
            this.snackBar.open("Product has been updated", "Success");
          } else {
            this.snackBar.open("Update failed, please try again", "Error");
          }
        });
      // Create mode
    } else {
      this.productSellService
        .addProduct(tempProduct)
        .subscribe((res: ProductSell) => {
          if (res) {
            this.router.navigate([
              `/admin/sell/product/${res.productId}/edit/`
            ]);
            this.snackBar.open("Product created", "Success");
          } else {
            this.snackBar.open(
              `Can't create product, please try again`,
              "Error"
            );
          }
        });
    }
  }

  resetForm() {
    if (this.product) {
      this.updateForm(this.product);
    } else {
      this.formGroup.reset();
    }
  }

  deletePhoto(photoId: number) {
    this.photo$ = this.photoService
      .deletePhoto(photoId)
      .subscribe((res: Photo) => {
        if (res) {
          const index = this.product.photos.findIndex(
            p => p.photoId === photoId
          );
          this.product.photos.splice(index, 1);

          this.snackBar.open("Photo deleted", "Success");
        } else {
          this.snackBar.open(`Can't delete photo, please try again`, "Error");
        }
      });
  }

  setMainPhoto(photo: PhotoForProduct) {
    this.photo$ = this.photoService
      .setMainPhotoForProduct(photo)
      .subscribe((res: PhotoForProduct) => {
        if (res) {
          const index = this.product.photos.findIndex(
            p => p.photoId === photo.photoId
          );

          this.product.photos.splice(index, 1);
          this.product.photos.unshift(res);

          this.snackBar.open("Main photo has been set", "Success");
        } else {
          this.snackBar.open(`Can't set main photo, please try again`, "Error");
        }
      });
  }

  get(name: string): AbstractControl {
    return this.formGroup.get(name);
  }

  getErrorMessage(name: string, value: string) {
    const control = this.formGroup.get(name);

    return control.hasError("required") ? `${value} is required` : null;
  }

  displayFn(category: CategorySell): string | undefined {
    return category ? category.categoryName : undefined;
  }

  refreshPhotoUpload(event: Photo) {
    this.product.photos.push(event);
  }

  togglePhotoUploadExpansion() {
    this.photoUploadExpansion = !this.photoUploadExpansion;
  }
}
