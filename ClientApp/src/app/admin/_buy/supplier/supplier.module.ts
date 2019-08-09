import { ProductsAddedComponent } from './supplier-detail/products-added/products-added.component';
import { ProductsNotAddedComponent } from './supplier-detail/products-not-added/products-not-added.component';
import { SupplierDetailComponent } from './supplier-detail/supplier-detail.component';
import { SupplierOrdersComponent } from './supplier-detail/supplier-orders/supplier-orders.component';
import { SupplierCardComponent } from './supplier-list/supplier-card/supplier-card.component';
import { SupplierListHomeComponent } from './supplier-list/supplier-list-home.component';
import { SupplierListComponent } from './supplier-list/supplier-list/supplier-list.component';
import { SupplierRoutingModule } from './supplier-routing.module';
import { SupplierComponent } from './supplier.component';
import { NgModule } from '@angular/core';
import { NgxGalleryModule } from 'ngx-gallery';
import { SharedModule } from 'src/app/_shared/shared.module';
import { MaterialSharedModule } from 'src/app/_shared/material-shared.module';
import { SupplierEditDialogModule } from 'src/app/_shared/components/_buy/suppliers/supplier-edit-dialog/supplier-edit-dialog.module';
import { PhotoUploadModule } from 'src/app/_shared/components/photo-upload/photo-upload.module';
import { PersonPhotoGalleryModule } from 'src/app/_shared/components/person-photo-gallery/person-photo-gallery.module';
import { SupplierEditComponent } from './supplier-edit/supplier-edit.component';
import {MatTabsModule} from '@angular/material/tabs';
import { SupplierProductsAddedComponent } from './supplier-edit/supplier-products-added/supplier-products-added.component';
import { SupplierProductsNotAddedComponent } from './supplier-edit/supplier-products-not-added/supplier-products-not-added.component';



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
    SupplierEditComponent,
    SupplierProductsAddedComponent,
    SupplierProductsNotAddedComponent,
  ],
  imports: [
    // Shared module
    SharedModule,

    // Material
    MaterialSharedModule,

    MatTabsModule,

    // Dialog
    SupplierEditDialogModule,

    // Photo upload
    PhotoUploadModule,

    // Photo gallery
    PersonPhotoGalleryModule,

    // Ngx-Gallery
    NgxGalleryModule,

    // Routing
    SupplierRoutingModule
  ]
})
export class SupplierModule {}
