import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Subscription } from "rxjs";
import { ProductOrder } from "src/app/_shared/intefaces/public/order/product-order";
import { OrderBuyService } from "src/app/_shared/services/buy/order-buy.service";
import { ProductSelect } from "src/app/_shared/intefaces/public/product-select";
import { ProductSellService } from "../../services/sell/product-sell.service";

@Component({
  selector: "app-order-products-edit-dialog",
  templateUrl: "./order-products-edit-dialog.component.html",
  styleUrls: ["./order-products-edit-dialog.component.scss"]
})
export class OrderProductsEditDialogComponent implements OnInit, OnDestroy {
  title = "Add new product";
  formGroup: FormGroup;

  productsSelect: ProductSelect[] = [];

  sub$ = new Subscription();

  constructor(
    private fb: FormBuilder,
    private orderService: OrderBuyService,
    private productSellService: ProductSellService,
    private dialogRef: MatDialogRef<OrderProductsEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public parentData
  ) {}

  ngOnInit() {
    // True: order buy, false: order sell
    if (this.parentData.orderMode) {
      this.getProductsNotAdded(this.parentData.supplierId);
    } else {
      this.getProductsSelect();
    }

    this.createForm();

    if (this.parentData.edit) {
      this.title = `Edit product for order ${this.parentData.orderId}`;
      this.updateForm();
    }
  }

  ngOnDestroy() {
    this.sub$.unsubscribe();
  }

  // Order buy: get product not added by supplier
  getProductsNotAdded(supplierId: number) {
    this.sub$.add(
      this.orderService
        .getProductsNotAddedToOrderBySupplierSelect(
          this.parentData.orderId,
          supplierId
        )
        .subscribe((products: ProductSelect[]) => {
          this.productsSelect = products;

          if (this.parentData.edit) {
            // In edit mode we add product from parent to productsSelect
            const parentProduct = <ProductSelect>{
              productId: this.parentData.productId,
              productName: this.parentData.productName
            };

            this.productsSelect.push(parentProduct);
          }
        })
    );
  }

  // Order sell: Get all products for select
  getProductsSelect() {
    this.sub$.add(
      this.productSellService
        .getProductsSelect()
        .subscribe((products: ProductSelect[]) => {
          this.productsSelect = products;

          if (this.parentData.edit) {
            // In edit mode we add product from parent to productsSelect
            const parentProduct = <ProductSelect>{
              productId: this.parentData.productId,
              productName: this.parentData.productName
            };

            this.productsSelect.push(parentProduct);
          }
        })
    );
  }

  createForm() {
    this.formGroup = this.fb.group({
      orderId: [""],
      productId: ["", Validators.required],
      quantity: ["", Validators.required],
      price: ["", Validators.required],
      tax: [""],
      rate: ["", Validators.required],
      unit: ["", Validators.required]
    });
  }

  updateForm() {
    this.formGroup.setValue({
      orderId: this.parentData.orderId,
      productId: this.parentData.productId,
      quantity: this.parentData.quantity,
      price: this.parentData.price,
      tax: this.parentData.tax,
      rate: this.parentData.rate,
      unit: this.parentData.unit
    });

    if (this.parentData.edit && this.parentData.orderMode) {
      this.formGroup.controls.productId.disable();
    }
  }

  onSubmit() {
    const productOrder = <ProductOrder>{
      productId: this.formGroup.value.productId,
      quantity: this.formGroup.value.quantity,
      price: this.formGroup.value.price,
      tax: this.formGroup.value.tax,
      rate: this.formGroup.value.rate,
      unit: this.formGroup.value.unit
    };

    if (this.parentData.edit) {
      productOrder.orderId = this.parentData.orderId;
      productOrder.productId = this.parentData.productId;

      this.sub$ = this.orderService
        .updateOrderProduct(productOrder)
        .subscribe(res => {
          this.dialogRef.close(res);
        });
    } else {
      productOrder.orderId = this.parentData.orderId;

      this.sub$ = this.orderService
        .addOrderProduct(productOrder)
        .subscribe(res => {
          this.dialogRef.close(res);
        });
    }
  }

  compareProduct(e1: ProductSelect, e2: ProductSelect) {
    return e1.productId === e2.productId && e1.productName === e2.productName;
  }

  onCancel() {
    this.dialogRef.close("cancel");
  }

  get(name: string): AbstractControl {
    return this.formGroup.get(name);
  }

  getErrorMessage(name: string, value: string) {
    const control = this.formGroup.get(name);

    return control.hasError("required") ? `${value} is required` : null;
  }
}
