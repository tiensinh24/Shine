import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import {
  MatTableDataSource,
  MatSort,
  MatPaginator,
  MatSnackBar,
} from '@angular/material';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { OrderBuyDto } from '../../_interfaces/order-buy-dto';
import { OrderBuyService } from '../../_services/order-buy.service';
import { ProductOrderDto } from '../../_interfaces/product-order-dto';
import { SupplierService } from 'src/app/supplier/_services/supplier.service';
import { ProductsBySupplierDto } from 'src/app/supplier/_interfaces/products-by-supplier';
import { ProductOrder } from '../../_interfaces/product-order';
import { ConfirmDialogService } from 'src/app/_shared/_services/confirm-dialog.service';

@Component({
  selector: 'app-order-buy-product-details',
  templateUrl: './order-buy-product-details.component.html',
  styleUrls: ['./order-buy-product-details.component.css'],
})
export class OrderBuyProductDetailsComponent
  implements OnInit, AfterViewInit, OnDestroy {
  displayedcolumn = [
    'productName',
    'quantity',
    'price',
    'tax',
    'rate',
    'unit',
    'actions',
  ];
  orderBuy: OrderBuyDto;
  products: ProductsBySupplierDto[];
  dataSource = new MatTableDataSource<ProductOrderDto>([]);
  formGroupDetail: FormGroup;
  orderId: number;

  orderBuySub = new Subscription();
  productsSub = new Subscription();
  dataSourceSub = new Subscription();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private orderBuyService: OrderBuyService,
    private supplierService: SupplierService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private confirmDialogService: ConfirmDialogService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.orderId = +this.route.snapshot.params.orderId;
    this.createForm();
  }

  ngAfterViewInit(): void {
    this.getDataSource(this.orderId);
    this.getOrderBuy(this.orderId);
    setTimeout(() => {
      this.getProductsBySupplier(this.orderBuy.personId);
    });
  }

  ngOnDestroy(): void {
    this.orderBuySub.unsubscribe();
    this.productsSub.unsubscribe();
    this.dataSourceSub.unsubscribe();
  }

  getDataSource(orderId: number) {
    this.dataSourceSub = this.orderBuyService
      .getProductDetailByOrder(orderId)
      .subscribe(res => {
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
    this.productsSub = this.supplierService
      .getProductsBySupplier(supplierId)
      .subscribe(res => {
        this.products = res;
        this.refreshProductSelectionAndDataSource('init');
      });
  }

  refreshProductSelectionAndDataSource(
    mode: string,
    prodOrder?: ProductOrder | ProductOrderDto | any,
  ) {
    if (mode === 'init') {
      this.dataSource.data.forEach(productOrder => {
        const index = this.products.findIndex(
          product => product.productId === productOrder.productId,
        );
        if (index > -1) {
          this.products.splice(index, 1);
        }
      });
    }

    if (mode === 'add') {
      this.orderBuyService.addProductOrder(prodOrder).subscribe(res => {
        if (res) {
          this.snackBar.open(`${res.productName} added`, 'Success');

          // Refresh dataSource
          this.dataSource.data.push(res);
          this.dataSource._updateChangeSubscription();

          // Refresh product selection list
          const index = this.products.findIndex(
            p => p.productId === res.productId,
          );
          if (index > -1) {
            this.products.splice(index, 1);
          }
        }
      });
    }

    if (mode === 'delete') {
      const index = this.dataSource.data.findIndex(
        p => p.productId === prodOrder.productId,
      );

      if (index > -1) {
        this.dataSource.data.splice(index, 1);
        this.dataSource._updateChangeSubscription();

        // Refresh product selection list, create new instance to push into product selection list
        const productOrder = <ProductsBySupplierDto>{
          productId: prodOrder.productId,
          productName: prodOrder.productName,
        };
        this.products.push(productOrder);
      }
    }
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
        orderId: this.orderBuy.orderId,
      });
      const prodOrder: ProductOrder = this.formGroupDetail.value;

      this.refreshProductSelectionAndDataSource('add', prodOrder);
    }
  }

  DeleteProductFromOrder(productOrderDto: ProductOrderDto) {
    const dialogRef = this.confirmDialogService.openDialog(
      `Are you sure to delete ${productOrderDto.productName}?`,
    );

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        const orderId = this.orderBuy.orderId;

        this.orderBuyService
          .deleteProductOrder(orderId, productOrderDto.productId)
          .subscribe(() => {
            this.refreshProductSelectionAndDataSource(
              'delete',
              productOrderDto,
            );
            this.snackBar.open(
              `${productOrderDto.productName} deleted`,
              'Success',
            );
          });
      }
    });
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
