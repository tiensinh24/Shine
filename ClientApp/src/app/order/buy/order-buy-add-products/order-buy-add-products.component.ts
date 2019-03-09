import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { SupplierService } from 'src/app/supplier/_services/supplier.service';
import { ProductsBySupplierDto } from 'src/app/supplier/_interfaces/products-by-supplier';
import { ProductOrder } from '../_interfaces/product-order';

@Component({
  selector: 'app-order-buy-add-products',
  templateUrl: './order-buy-add-products.component.html',
  styleUrls: ['./order-buy-add-products.component.css']
})
export class OrderBuyAddProductsComponent implements OnInit, OnDestroy {
  tableTitle = 'Order Details';
  products: ProductsBySupplierDto[];
  formGroupDetail: FormGroup;
  productsToAdd: ProductOrder[] = [];

  @Output() productOrders = new EventEmitter<ProductOrder[]>();

  @Input() orderId: number;
  @Input() supplierId: number;

  productsSub: Subscription;

  constructor(private supplierService: SupplierService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.getProductsBySupplier(this.supplierId);
    this.createForm();
  }

  ngOnDestroy(): void {
    this.productsSub.unsubscribe();
  }

  getProductsBySupplier(supplierId: number) {
    this.productsSub = this.supplierService.getProductsBySupplier(supplierId).subscribe(res => {
      this.products = res;
    });
  }

  outProductOrders() {
    this.productOrders.emit(this.productsToAdd);
  }

  createForm() {
    this.formGroupDetail = this.fb.group({
      orderId: [this.orderId, Validators.required],
      productId: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required],
      tax: [''],
      rate: ['', Validators.required],
      unit: ['', Validators.required],

      productName: ['']
    });
  }

  addProduct() {
    if (this.formGroupDetail.valid) {
      this.formGroupDetail.patchValue({
        productId: this.formGroupDetail.value.productId.productId,
        productName: this.formGroupDetail.value.productId.name
      });
      this.productsToAdd.push(this.formGroupDetail.value);
      this.refreshProductSelection(this.formGroupDetail.value.productId);
    }
  }

  refreshProductSelection(productId: number) {
    const index = +this.products.findIndex(p => p.productId === productId);

    if (index > -1) {
      this.products.splice(index, 1);
    }
  }

  removeProduct(productOrder: ProductOrder) {
    const index = +this.productsToAdd.findIndex(p => p.productId === productOrder.productId);

    if (index > -1) {
      this.productsToAdd.splice(index, 1);

      const prod = <ProductsBySupplierDto> {
        productId: productOrder.productId,
        name: productOrder.productName
      };

      this.products.push(prod);
      this.products.sort((a, b ) => a.name.localeCompare(b.name));
    }
  }



  get(name: string): AbstractControl {
    return this.formGroupDetail.get(name);
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