
import { ProductBuyEditComponent } from './product-buy-edit/product-buy-edit.component';
import { ProductBuyRoutingModule } from './product-buy-routing.module';
import { ProductBuyComponent } from './product-buy.component';
import { NgModule } from '@angular/core';
import { CategoryBuyDialogModule } from 'src/app/_shared/components/_buy/categories/category-buy-dialog/category-buy-dialog.module';
import { ProductBuyEditDialogModule } from 'src/app/_shared/components/_buy/products/product-buy-edit-dialog/product-buy-edit-dialog.module';
import { PhotoUploadModule } from 'src/app/_shared/components/photo-upload/photo-upload.module';
import { ProductPhotoGalleryModule } from 'src/app/_shared/components/product-photo-gallery/product-photo-gallery.module';
import { MaterialSharedModule } from 'src/app/_shared/material-shared.module';
import { SharedModule } from 'src/app/_shared/shared.module';
import { ProductBuyListComponent } from './product-buy-list/product-buy-list.component';

@NgModule({
  declarations: [
    ProductBuyComponent,
    ProductBuyListComponent,
    ProductBuyEditComponent,
  ],
  imports: [
    // Shared
    SharedModule,

    // Material
    MaterialSharedModule,

    // Dialog
    CategoryBuyDialogModule,

    // Photo-Gallery
    ProductPhotoGalleryModule,

    // Photo upload
    PhotoUploadModule,

    // Routing
    ProductBuyRoutingModule
  ]
})
export class ProductBuyModule {}
