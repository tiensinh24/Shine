import { ProductBuyDetail } from '../../../../_shared/intefaces/buy/product/product-buy-detail';

import { ProductBuyService } from '../../../../_shared/services/buy/product-buy.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductBuyEditDialogComponent } from 'src/app/_shared/components/_buy/products/product-buy-edit-dialog/product-buy-edit-dialog.component';
import { PhotoForProduct } from 'src/app/_shared/intefaces/public/photo-for-product';
import { environment } from 'src/environments/environment';
import { ProductBuyList } from 'src/app/_shared/intefaces/buy/product/product-buy-list';

@Component({
  selector: 'app-product-buy-detail',
  templateUrl: './product-buy-detail.component.html',
  styleUrls: ['./product-buy-detail.component.css']
})
export class ProductBuyDetailComponent implements OnInit {
  baseUrl = environment.URL;
  product = <ProductBuyDetail>{};
  photos: PhotoForProduct[] = [];
  productId: number;
  photoUploadUrl = '';
  isUploadPhoto = false;

  constructor(private productService: ProductBuyService, private route: ActivatedRoute, private router: Router, private dialog: MatDialog) {}

  ngOnInit() {
    this.getProduct();
  }

  getProduct() {
    this.productId = +this.route.snapshot.params.productId;

    this.productService.getProduct(this.productId).subscribe(res => {
      if (res) {
        this.photoUploadUrl = `${this.baseUrl}api/photo/product/${res.productId}`;
        this.product = res;
        this.photos = res.photos;
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
      height: '525px',
      panelClass: 'custom-dialog',
      data: {
        productId: this.product.productId,
        productName: this.product.productName,
        specification: this.product.specification,
        categoryId: this.product.categoryId
      }
    };

    // Open dialog with config & passed data
    const dialogRef = this.dialog.open(ProductBuyEditDialogComponent, dialogConfig);

    // Pass data from dialog in to main component
    dialogRef.afterClosed().subscribe((data: ProductBuyList) => {
      if (data) {
        this.getProduct();
      }
    });
  }

  // Receive from @Output
  refreshPhotoUpload(photo: PhotoForProduct) {
    // Array is immutable, use push will not trigger change detection
    //  So we create a new array to trigger CD
    this.photos = this.photos.concat(photo);
  }

  onEdit() {
    this.openEditDialog();
  }

  onList() {
    this.router.navigate(['product-buy/list']);
  }
}
