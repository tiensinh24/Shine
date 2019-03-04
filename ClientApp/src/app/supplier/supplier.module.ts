import { NgModule } from '@angular/core';

import { SupplierRoutingModule } from './supplier-routing.module';
import { SupplierHomeComponent } from './supplier-home/supplier-home.component';
import { SupplierDetailComponent } from './supplier-detail/supplier-detail.component';
import { SupplierEditComponent } from './supplier-edit/supplier-edit.component';
import { SupplierListComponent } from './supplier-list/supplier-list.component';
import { SupplierComponent } from './supplier.component';
import { SharedModule } from '../_shared/shared.module';
import { MaterialSharedModule } from '../_shared/material-shared.module';
import { SupplierEditDialogSharedModule } from '../_shared/components/supplier-edit-dialog/supplier-edit-dialog-shared.module';
import { ProductsProvidedComponent } from './products-provided/products-provided.component';
import { AddProductsForSupplierComponent } from './add-products-for-supplier/add-products-for-supplier.component';

@NgModule({
  declarations: [
    SupplierHomeComponent,
    SupplierDetailComponent,
    SupplierEditComponent,
    SupplierListComponent,
    SupplierComponent,
    ProductsProvidedComponent,
    AddProductsForSupplierComponent
  ],
  imports: [
    // Shared module
    SharedModule,

    // Material
    MaterialSharedModule,

    // Dialog
    SupplierEditDialogSharedModule,

    // Routing
    SupplierRoutingModule
  ]
})
export class SupplierModule { }
