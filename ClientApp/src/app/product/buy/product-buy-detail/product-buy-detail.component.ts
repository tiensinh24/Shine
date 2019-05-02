import {
    ProductBuyEditDialogComponent
} from 'src/app/_shared/components/product-buy-edit-dialog/product-buy-edit-dialog.component';
import { PhotoForProduct } from 'src/app/photo/_interfaces/photo-for-product';
import { environment } from 'src/environments/environment';

import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductBuyDetail } from '../_interfaces/product-buy-detail';
import { ProductBuyList } from '../_interfaces/product-buy-list';
import { ProductBuyService } from '../_services/product-buy.service';

@Component({
  selector: 'app-product-buy-detail',
  templateUrl: './product-buy-detail.component.html',
  styleUrls: ['./product-buy-detail.component.css'],
})
export class ProductBuyDetailComponent implements OnInit {
  baseUrl = environment.URL;
  product = <ProductBuyDetail>{};
  productId: number;
  photoUploadUrl = '';
  isUploadPhoto = false;

  constructor(
    private productService: ProductBuyService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.getProduct();
  }

  getProduct() {
    this.productId = +this.route.snapshot.params.productId;

    this.productService.getProduct(this.productId).subscribe(res => {
      if (res) {
        this.photoUploadUrl = `${this.baseUrl}api/photo/product/${
          res.productId
        }`;
        this.product = res;
      }
    });
  }

  toggleUploadPhoto() {
    this.isUploadPhoto = !this.isUploadPhoto;
  }

  // Open product-buy-edit-dialog
  openEditDialog() {
    const dialogConfig = <MatDialogConfig>{
      disableClose: true,
      autoFocus: true,
      maxWidth: '100vw',
      maxHeight: '100vh',
      width: '800px',
      height: '500px',
      panelClass: 'custom-dialog',
      data: {
        productId: this.product.productId,
        productName: this.product.productName,
        specification: this.product.specification,
        categoryId: this.product.categoryId,
      },
    };

    // Open dialog with config & passed data
    const dialogRef = this.dialog.open(
      ProductBuyEditDialogComponent,
      dialogConfig,
    );

    // Pass data from dialog in to main component
    dialogRef.afterClosed().subscribe((data: ProductBuyList) => {
      if (data) {
        this.getProduct();
      }
    });
  }

  onEdit() {
    this.openEditDialog();
  }

  onList() {
    this.router.navigate(['product-buy/list']);
  }
}
