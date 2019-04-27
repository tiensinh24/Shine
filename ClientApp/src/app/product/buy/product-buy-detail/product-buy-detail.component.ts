import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhotoForProduct } from 'src/app/photo/_interfaces/photo-for-product';
import { environment } from 'src/environments/environment';
import { ProductBuyDetail } from '../_interfaces/product-buy-detail';
import { ProductBuyService } from '../_services/product-buy.service';

@Component({
  selector: 'app-product-buy-detail',
  templateUrl: './product-buy-detail.component.html',
  styleUrls: ['./product-buy-detail.component.css']
})
export class ProductBuyDetailComponent implements OnInit {
  baseUrl = environment.URL;
  product = <ProductBuyDetail>{};
  productId: number;
  photoUploadUrl = '';
  isUploadPhoto = false;

  constructor(private productService: ProductBuyService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getProduct();
  }

  getProduct() {
    this.productId = +this.route.snapshot.params.productId;

    this.productService.getProduct(this.productId).subscribe(res => {
      if (res) {
        this.photoUploadUrl = `${this.baseUrl}api/photo/product/${res.productId}`;
        this.product = res;
      }
    });
  }

  toggleUploadPhoto() {
    this.isUploadPhoto = !this.isUploadPhoto;
  }
}
