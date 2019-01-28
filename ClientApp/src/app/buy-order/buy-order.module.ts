import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuyOrderRoutingModule } from './buy-order-routing.module';
import { BuyOrderDetailComponent } from './buy-order-detail/buy-order-detail.component';
import { BuyOrderEditComponent } from './buy-order-edit/buy-order-edit.component';
import { BuyOrderHomeComponent } from './buy-order-home/buy-order-home.component';
import { BuyOrderListComponent } from './buy-order-list/buy-order-list.component';

@NgModule({
  declarations: [
    BuyOrderDetailComponent,
    BuyOrderEditComponent,
    BuyOrderHomeComponent,
    BuyOrderListComponent
  ],
  imports: [
    CommonModule,
    BuyOrderRoutingModule
  ]
})
export class BuyOrderModule { }
