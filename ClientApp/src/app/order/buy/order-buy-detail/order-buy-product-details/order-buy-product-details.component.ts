import { AfterViewChecked, AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { ConfirmDialogService } from 'src/app/_shared/_services/confirm-dialog.service';
import { ProductBuyService } from 'src/app/product/buy/_services/product-buy.service';
import { OrderBuyProducts } from '../../_interfaces/order-buy-products';
import { OrderBuyService } from '../../_services/order-buy.service';

@Component({
  selector: 'app-order-buy-product-details',
  templateUrl: './order-buy-product-details.component.html',
  styleUrls: ['./order-buy-product-details.component.css']
})
export class OrderBuyProductDetailsComponent implements OnInit {
  displayedcolumn = ['productName', 'quantity', 'price', 'tax', 'rate', 'unit', 'total', 'actions'];
  dataSource = new MatTableDataSource<OrderBuyProducts>([]);

  @Input() products: OrderBuyProducts[];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private orderBuyService: OrderBuyService,
    private productBuyService: ProductBuyService,
    private confirmService: ConfirmDialogService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getDataSource();
  }

  getDataSource() {
    this.dataSource = new MatTableDataSource<OrderBuyProducts>(this.products);
  }

  getProductsNotBySupplier(supplierId: number) {}

  deleteProductFromOrder(product: OrderBuyProducts) {
    const dialogRef = this.confirmService.openDialog(`Are you sure to delete ${product.productName}?`);

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        const orderId = this.products[0].orderId;

        this.orderBuyService.deleteProductOrder(orderId, product.productId).subscribe(() => {
          this.snackBar.open(`${product.productName} deleted`, 'Success');
        });
      }
    });
  }
}
