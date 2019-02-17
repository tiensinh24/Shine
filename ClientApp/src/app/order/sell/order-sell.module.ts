import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderSellRoutingModule } from './order-sell-routing.module';
import { OrderSellComponent } from './order-sell.component';
import { OrderSellDetailComponent } from './order-sell-detail/order-sell-detail.component';
import { OrderSellEditComponent } from './order-sell-edit/order-sell-edit.component';
import { OrderSellHomeComponent } from './order-sell-home/order-sell-home.component';
import { OrderSellListComponent } from './order-sell-list/order-sell-list.component';

@NgModule({
  declarations: [OrderSellComponent, OrderSellDetailComponent, OrderSellEditComponent, OrderSellHomeComponent, OrderSellListComponent],
  imports: [
    CommonModule,
    OrderSellRoutingModule
  ]
})
export class OrderSellModule { }
