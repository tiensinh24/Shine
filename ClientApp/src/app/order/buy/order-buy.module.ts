import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderBuyRoutingModule } from './order-buy-routing.module';
import { OrderBuyComponent } from './order-buy.component';
import { OrderBuyDetailComponent } from './order-buy-detail/order-buy-detail.component';
import { OrderBuyEditComponent } from './order-buy-edit/order-buy-edit.component';
import { OrderBuyHomeComponent } from './order-buy-home/order-buy-home.component';
import { OrderBuyListComponent } from './order-buy-list/order-buy-list.component';
import { AddProductsOrderComponent } from './add-products-order/add-products-order.component';


@NgModule({
  declarations: [
    OrderBuyComponent,
    OrderBuyDetailComponent,
    OrderBuyEditComponent,
    OrderBuyHomeComponent,
    OrderBuyListComponent,
    AddProductsOrderComponent
  ],
  imports: [
    CommonModule,
    OrderBuyRoutingModule
  ]
})
export class OrderBuyModule { }
