import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { OrderBuyDto } from '../../_interfaces/order-buy-dto';
import { OrderBuyService } from '../../_services/order-buy.service';
import { ProductOrderDto } from '../../_interfaces/product-order-dto';
import { ProductBuy } from 'src/app/product/buy/_interfaces/product-buy';
import { ProductBuyService } from 'src/app/product/buy/_services/product-buy.service';
import { SupplierService } from 'src/app/supplier/_services/supplier.service';
import { ProductsBySupplierDto } from 'src/app/supplier/_interfaces/products-by-supplier';
import { ProductOrder } from '../../_interfaces/product-order';

@Component({
  selector: 'app-order-buy-product-details',
  templateUrl: './order-buy-product-details.component.html',
  styleUrls: ['./order-buy-product-details.component.css']
})
export class OrderBuyProductDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedcolumn = ['productName', 'quantity', 'price', 'tax', 'rate', 'unit', 'actions'];
  orderBuy: OrderBuyDto;
  products: ProductsBySupplierDto[];
  dataSource = new MatTableDataSource<ProductOrderDto>([]);
  formGroupDetail: FormGroup;

  orderBuySub = new Subscription();
  productsSub = new Subscription();
  dataSourceSub = new Subscription();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private orderBuyService: OrderBuyService,
    private supplierService: SupplierService,
    private fb: FormBuilder,
    private route: ActivatedRoute) { }

    ngOnInit(): void {
      this.createForm();
    }

  ngAfterViewInit(): void {
    const id = +this.route.snapshot.params.orderId;

    this.getDataSource(id);
    this.getOrderBuy(id);
    setTimeout(() => {
      this.getProductsBySupplier(this.orderBuy.personId);
    });
  }

  getDataSource(orderId: number) {
    this.dataSourceSub = this.orderBuyService.getProductDetailByOrder(orderId).subscribe(res => {
      this.dataSource = new MatTableDataSource<ProductOrderDto>(res);
      setTimeout(() => (this.dataSource.sort = this.sort));
      setTimeout(() => (this.dataSource.paginator = this.paginator));
    });
  }

  getOrderBuy(orderId: number) {
    this.orderBuySub = this.orderBuyService.getOrder(orderId).subscribe(res => {
      this.orderBuy = res;
    });
  }

  getProductsBySupplier(supplierId: number) {
    this.productsSub = this.supplierService.getProductsBySupplier(supplierId).subscribe(res => {
      this.products = res;
    });
  }

  ngOnDestroy(): void {
    this.orderBuySub.unsubscribe();
    this.productsSub.unsubscribe();
    this.dataSourceSub.unsubscribe();
  }

  createForm() {
    this.formGroupDetail = this.fb.group({
      orderId: [''],
      productId: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required],
      tax: [''],
      rate: ['', Validators.required],
      unit: ['', Validators.required],

    });
  }

  addProductOrder() {
    if (this.formGroupDetail.valid) {
      this.formGroupDetail.patchValue({
        orderId: this.orderBuy.orderId
      });
      const prodOrder: ProductOrder = this.formGroupDetail.value;

      this.orderBuyService.addProductOrder(prodOrder).subscribe(() => {
        const id = +this.route.snapshot.params.orderId;
        this.getDataSource(id);
      });
    }
  }

  DeleteProductFromOrder(productId: number) {
    const orderId = this.orderBuy.orderId;

    this.orderBuyService.deleteProductOrder(orderId, productId).subscribe(() => {
      this.refreshProducts(productId);
    });
  }

  refreshProducts(productId: number) {
    const index = this.dataSource.data.findIndex(p => p.productId === productId);

    if (index > -1) {
      this.dataSource.data.splice(index, 1);
      this.dataSource._updateChangeSubscription();
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
