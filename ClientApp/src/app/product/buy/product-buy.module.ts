import { NgModule } from '@angular/core';
import { CategoryBuyDialogSharedModule } from 'src/app/_shared/components/category-buy-dialog/category-buy-dialog-shared.module';
import { PhotoUploadSharedModule } from 'src/app/_shared/components/photo-upload/photo-upload-shared.module';
import { ProductBuyEditDialogSharedModule } from 'src/app/_shared/components/product-buy-edit-dialog/product-buy-edit-dialog-shared.module';
import { ProductPhotoGallerySharedModule } from 'src/app/_shared/components/product-photo-gallery/product-photo-gallery-shared.module';
import { MaterialSharedModule } from 'src/app/_shared/material-shared.module';
import { SharedModule } from 'src/app/_shared/shared.module';
import { ProductBuyDetailComponent } from './product-buy-detail/product-buy-detail.component';
import { ProductBuyEditComponent } from './product-buy-edit/product-buy-edit.component';
import { ProductBuyHomeComponent } from './product-buy-home/product-buy-home.component';
import { ProductBuyListComponent } from './product-buy-list/product-buy-list.component';
import { ProductBuyRoutingModule } from './product-buy-routing.module';
import { ProductBuyComponent } from './product-buy.component';

@NgModule({
  declarations: [
    ProductBuyComponent,
    ProductBuyHomeComponent,
    ProductBuyDetailComponent,
    ProductBuyEditComponent,
    ProductBuyListComponent
  ],
  imports: [
    // Shared
    SharedModule,

    // Material
    MaterialSharedModule,

    // Dialog
    ProductBuyEditDialogSharedModule,
    CategoryBuyDialogSharedModule,

    // Photo-Gallery
    ProductPhotoGallerySharedModule,

    // Photo upload
    PhotoUploadSharedModule,

    // Routing
    ProductBuyRoutingModule
  ]
})
export class ProductBuyModule {}
