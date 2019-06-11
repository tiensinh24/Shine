import { NgxGalleryModule } from 'ngx-gallery';

import { NgModule } from '@angular/core';

import {
    PersonPhotoGallerySharedModule
} from '../_shared/components/person-photo-gallery/person-photo-gallery-shared.module';
import {
    PhotoUploadSharedModule
} from '../_shared/components/photo-upload/photo-upload-shared.module';
import {
    SupplierEditDialogSharedModule
} from '../_shared/components/supplier-edit-dialog/supplier-edit-dialog-shared.module';
import { MaterialSharedModule } from '../_shared/material-shared.module';
import { SharedModule } from '../_shared/shared.module';
import { ProductsAddedComponent } from './supplier-detail/products-added/products-added.component';
import {
    ProductsNotAddedComponent
} from './supplier-detail/products-not-added/products-not-added.component';
import { SupplierDetailComponent } from './supplier-detail/supplier-detail.component';
import {
    SupplierOrdersComponent
} from './supplier-detail/supplier-orders/supplier-orders.component';
import { SupplierCardComponent } from './supplier-list/supplier-card/supplier-card.component';
import { SupplierListHomeComponent } from './supplier-list/supplier-list-home.component';
import { SupplierListComponent } from './supplier-list/supplier-list/supplier-list.component';
import { SupplierRoutingModule } from './supplier-routing.module';
import { SupplierComponent } from './supplier.component';

@NgModule({
  declarations: [
    SupplierDetailComponent,
    SupplierListComponent,
    SupplierComponent,
    ProductsNotAddedComponent,
    ProductsAddedComponent,
    SupplierOrdersComponent,
    SupplierCardComponent,
    SupplierListHomeComponent,    
  ],
  imports: [
    // Shared module
    SharedModule,

    // Material
    MaterialSharedModule,

    // Dialog
    SupplierEditDialogSharedModule,

    // Photo upload
    PhotoUploadSharedModule,

    // Photo gallery
    PersonPhotoGallerySharedModule,

    // Ngx-Gallery
    NgxGalleryModule,

    // Routing
    SupplierRoutingModule
  ]
})
export class SupplierModule {}
