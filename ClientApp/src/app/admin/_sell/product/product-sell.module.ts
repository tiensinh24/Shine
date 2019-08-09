import { NgModule } from "@angular/core";

import { ProductSellRoutingModule } from "./product-sell-routing.module";
import { ProductSellComponent } from "./product-sell.component";
import { ProductSellEditComponent } from "./product-sell-edit/product-sell-edit.component";
import { ProductSellListComponent } from "./product-sell-list/product-sell-list.component";
import { PhotoUploadModule } from "src/app/_shared/components/photo-upload/photo-upload.module";
import { ProductPhotoGalleryModule } from "src/app/_shared/components/product-photo-gallery/product-photo-gallery.module";
import { MaterialSharedModule } from "src/app/_shared/material-shared.module";
import { SharedModule } from "src/app/_shared/shared.module";
import { CategorySellDialogModule } from "src/app/_shared/components/_sell/categories/category-sell-dialog/category-sell-dialog.module";

@NgModule({
  declarations: [
    ProductSellComponent,
    ProductSellEditComponent,
    ProductSellListComponent
  ],
  imports: [
    // Shared
    SharedModule,

    // Material
    MaterialSharedModule,

    // Dialog
    CategorySellDialogModule,

    // Photo-Gallery
    ProductPhotoGalleryModule,

    // Photo upload
    PhotoUploadModule,

    // Routing
    ProductSellRoutingModule
  ]
})
export class ProductSellModule {}
