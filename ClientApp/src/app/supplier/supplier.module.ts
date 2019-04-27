import { NgModule } from '@angular/core';
import { NgxGalleryModule } from 'ngx-gallery';
import { ProductsAddedComponent } from './products-added/products-added.component';
import { ProductsNotAddedComponent } from './products-not-added/products-not-added.component';
import { ProductsProvidedComponent } from './products-provided/products-provided.component';
import { SupplierDetailComponent } from './supplier-detail/supplier-detail.component';
import { SupplierEditComponent } from './supplier-edit/supplier-edit.component';
import { SupplierHomeComponent } from './supplier-home/supplier-home.component';
import { SupplierListComponent } from './supplier-list/supplier-list.component';
import { SupplierRoutingModule } from './supplier-routing.module';
import { SupplierComponent } from './supplier.component';
import { PersonPhotoGallerySharedModule } from '../_shared/components/person-photo-gallery/person-photo-gallery-shared.module';
import { PhotoUploadSharedModule } from '../_shared/components/photo-upload/photo-upload-shared.module';
import { SupplierEditDialogSharedModule } from '../_shared/components/supplier-edit-dialog/supplier-edit-dialog-shared.module';
import { MaterialSharedModule } from '../_shared/material-shared.module';
import { SharedModule } from '../_shared/shared.module';

@NgModule({
  declarations: [
    SupplierHomeComponent,
    SupplierDetailComponent,
    SupplierEditComponent,
    SupplierListComponent,
    SupplierComponent,
    ProductsProvidedComponent,
    ProductsNotAddedComponent,
    ProductsAddedComponent
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
