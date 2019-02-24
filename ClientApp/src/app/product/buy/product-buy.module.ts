import { NgModule } from '@angular/core';

import { ProductBuyRoutingModule } from './product-buy-routing.module';
import { ProductBuyComponent } from './product-buy.component';
import { ProductBuyHomeComponent } from './product-buy-home/product-buy-home.component';
import { ProductBuyDetailComponent } from './product-buy-detail/product-buy-detail.component';
import { ProductBuyEditComponent } from './product-buy-edit/product-buy-edit.component';
import { ProductBuyListComponent } from './product-buy-list/product-buy-list.component';
import { SharedModule } from 'src/app/_shared/shared.module';
import { MaterialSharedModule } from 'src/app/_shared/material-shared.module';
import { CategoryBuyDialogSharedModule } from 'src/app/_shared/components/category-buy-dialog/category-buy-dialog-shared.module';
import { ProductBuyEditDialogSharedModule } from 'src/app/_shared/components/product-buy-edit-dialog/product-buy-edit-dialog-shared.module';

@NgModule({
  declarations: [
    ProductBuyComponent,
    ProductBuyHomeComponent,
    ProductBuyDetailComponent,
    ProductBuyEditComponent,
    ProductBuyListComponent,

  ],
  imports: [
    // Shared
    SharedModule,

    // Material
    MaterialSharedModule,

    // Dialog
    ProductBuyEditDialogSharedModule,
    CategoryBuyDialogSharedModule,

    // Routing
    ProductBuyRoutingModule,
  ],
})
export class ProductBuyModule { }
