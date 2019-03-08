import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderBuyRoutingModule } from './order-buy-routing.module';
import { OrderBuyComponent } from './order-buy.component';
import { OrderBuyDetailComponent } from './order-buy-detail/order-buy-detail.component';
import { OrderBuyEditComponent } from './order-buy-edit/order-buy-edit.component';
import { OrderBuyHomeComponent } from './order-buy-home/order-buy-home.component';
import { OrderBuyListComponent } from './order-buy-list/order-buy-list.component';
import { SharedModule } from 'src/app/_shared/shared.module';
import { MaterialSharedModule } from 'src/app/_shared/material-shared.module';
import { OrderBuyAddProductsComponent } from './order-buy-add-products/order-buy-add-products.component';


@NgModule({
  declarations: [
    OrderBuyComponent,
    OrderBuyDetailComponent,
    OrderBuyEditComponent,
    OrderBuyHomeComponent,
    OrderBuyListComponent,
    OrderBuyAddProductsComponent,

  ],
  imports: [
    // Shared
    SharedModule,

    // Material
    MaterialSharedModule,

    // Routing
    OrderBuyRoutingModule
  ]
})
export class OrderBuyModule { }
