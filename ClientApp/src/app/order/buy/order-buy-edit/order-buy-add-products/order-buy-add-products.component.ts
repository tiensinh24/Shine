import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProductSelect } from 'src/app/product/_interfaces/product-select';
import { ProductBuyList } from 'src/app/product/buy/_interfaces/product-buy-list';
import { SupplierService } from 'src/app/supplier/_services/supplier.service';
import { OrderBuyProducts } from '../../_interfaces/order-buy-products';

@Component({
  selector: 'app-order-buy-add-products',
  templateUrl: './order-buy-add-products.component.html',
  styleUrls: ['./order-buy-add-products.component.css']
})
export class OrderBuyAddProductsComponent implements OnInit, OnDestroy {
  tableTitle = 'Order Details';
  products: ProductSelect[];
  formDetails: FormGroup;
  productsToAdd: OrderBuyProducts[] = [];

  @Output() productOrders = new EventEmitter<OrderBuyProducts[]>();

  @Input() supplierId: number;

  productsSub = new Subscription();

  constructor(private supplierService: SupplierService, private fb: FormBuilder) {}

  ngOnInit() {
    this.getProductsBySupplier(this.supplierId);
    this.createForm();
  }

  ngOnDestroy(): void {
    this.outProductOrders();

    this.productsSub.unsubscribe();
  }

  getProductsBySupplier(supplierId: number) {
    this.productsSub = this.supplierService
      .getProductsBySupplierForSelect(supplierId)
      .subscribe((products: ProductSelect[]) => {
        this.products = products;
      });
  }

  // Output productOrders to main component
  outProductOrders() {
    this.productOrders.emit(this.productsToAdd);
  }

  createForm() {
    this.formDetails = this.fb.group({
      orderId: ['0'],
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
    if (this.formDetails.valid) {
      this.formDetails.patchValue({
        productId: this.formDetails.value.productId.productId,
        productName: this.formDetails.value.productId.productName
      });
      this.productsToAdd.push(this.formDetails.value);
      this.refreshProductSelection(this.formDetails.value.productId);
    }
  }

  refreshProductSelection(productId: number) {
    const index = +this.products.findIndex(p => p.productId === productId);

    if (index > -1) {
      this.products.splice(index, 1);
    }
  }

  removeProduct(productOrder: OrderBuyProducts) {
    const index = +this.productsToAdd.findIndex(p => p.productId === productOrder.productId);

    if (index > -1) {
      this.productsToAdd.splice(index, 1);

      const prod = <ProductSelect>{
        productId: productOrder.productId,
        productName: productOrder.productName
      };

      this.products.push(prod);
      this.products.sort((a, b) => a.productName.localeCompare(b.productName));
    }
  }

  get(name: string): AbstractControl {
    return this.formDetails.get(name);
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
