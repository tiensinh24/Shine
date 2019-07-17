import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProductSelect } from 'src/app/_shared/intefaces/public/product-select';
import { SupplierService } from 'src/app/_shared/services/buy/supplier.service';
import { OrderBuyProducts } from 'src/app/_shared/intefaces/buy/order/order-buy-products';

@Component({
  selector: 'app-order-buy-add-products',
  templateUrl: './order-buy-add-products.component.html',
  styleUrls: ['./order-buy-add-products.component.css']
})
export class OrderBuyAddProductsComponent implements OnInit, OnDestroy {
  tableTitle = 'Order Details';
  products: ProductSelect[];
  detailForm: FormGroup;
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
    this.productsSub.unsubscribe();
  }

  getProductsBySupplier(supplierId: number) {
    this.productsSub = this.supplierService.getProductsForSelect(supplierId).subscribe((products: ProductSelect[]) => {
      this.products = products;
    });
  }

  createForm() {
    this.detailForm = this.fb.group({
      orderId: ['0'],
      productId: ['', { updateOn: 'blur' }, Validators.required],
      quantity: ['', { updateOn: 'blur' }, Validators.required],
      price: ['', { updateOn: 'blur' }, Validators.required],
      tax: ['', { updateOn: 'blur' }, Validators.required],
      rate: ['', { updateOn: 'blur' }, Validators.required],
      unit: ['', { updateOn: 'blur' }, Validators.required],

      productName: ['']
    });
  }

  addProduct() {
    if (this.detailForm.valid) {
      this.detailForm.patchValue({
        productId: this.detailForm.value.productId.productId,
        productName: this.detailForm.value.productId.productName
      });
      if (!this.detailForm.invalid) {
        this.productsToAdd.push(this.detailForm.value);

        // output value
        this.productOrders.emit(this.productsToAdd);

        this.refreshProductSelection(this.detailForm.value.productId);
      }
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

      // output value
      this.productOrders.emit(this.productsToAdd);

      const prod = <ProductSelect>{
        productId: productOrder.productId,
        productName: productOrder.productName
      };

      this.products.push(prod);
      this.products.sort((a, b) => a.productName.localeCompare(b.productName));
    }
  }

  get(name: string): AbstractControl {
    return this.detailForm.get(name);
  }

  getErrorMessage(name: string, value: string) {
    const control = this.detailForm.get(name);

    return control.hasError('required') ? `${value} is required` : '';
  }
}
