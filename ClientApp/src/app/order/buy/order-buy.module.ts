import { NgModule } from '@angular/core';

import { OrderBuyRoutingModule } from './order-buy-routing.module';
import { OrderBuyComponent } from './order-buy.component';
import { OrderBuyDetailComponent } from './order-buy-detail/order-buy-detail.component';
import { OrderBuyEditComponent } from './order-buy-edit/order-buy-edit.component';
import { OrderBuyHomeComponent } from './order-buy-home/order-buy-home.component';
import { OrderBuyListComponent } from './order-buy-list/order-buy-list.component';
import { SharedModule } from 'src/app/_shared/shared.module';
import { MaterialSharedModule } from 'src/app/_shared/material-shared.module';
import { OrderBuyAddProductsComponent } from './order-buy-edit/order-buy-add-products/order-buy-add-products.component';
import { OrderBuyProductDetailsComponent } from './order-buy-detail/order-buy-product-details/order-buy-product-details.component';
import { OrderBuyEditDialogSharedModule } from 'src/app/_shared/components/order-buy-edit-dialog/order-buy-edit-dialog-shared.module';

@NgModule({
  declarations: [
    OrderBuyComponent,
    OrderBuyDetailComponent,
    OrderBuyEditComponent,
    OrderBuyHomeComponent,
    OrderBuyListComponent,
    OrderBuyAddProductsComponent,
    OrderBuyProductDetailsComponent,
  ],
  imports: [
    // Shared
    SharedModule,

    // Dialog
    OrderBuyEditDialogSharedModule,

    // Material
    MaterialSharedModule,

    // Routing
    OrderBuyRoutingModule,
  ],
})
export class OrderBuyModule {}
