import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellOrderRoutingModule } from './sell-order-routing.module';
import { SellOrderHomeComponent } from './sell-order-home/sell-order-home.component';
import { SellOrderDetailComponent } from './sell-order-detail/sell-order-detail.component';
import { SellOrderEditComponent } from './sell-order-edit/sell-order-edit.component';
import { SellOrderListComponent } from './sell-order-list/sell-order-list.component';
import { SellOrderComponent } from './sell-order.component';

@NgModule({
  declarations: [
    SellOrderHomeComponent,
    SellOrderDetailComponent,
    SellOrderEditComponent,
    SellOrderListComponent,
    SellOrderComponent
  ],
  imports: [
    CommonModule,
    SellOrderRoutingModule
  ]
})
export class SellOrderModule { }
