import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductSellRoutingModule } from './product-sell-routing.module';
import { ProductSellComponent } from './product-sell.component';
import { ProductSellHomeComponent } from './product-sell-home/product-sell-home.component';
import { ProductSellDetailComponent } from './product-sell-detail/product-sell-detail.component';
import { ProductSellEditComponent } from './product-sell-edit/product-sell-edit.component';
import { ProductSellListComponent } from './product-sell-list/product-sell-list.component';


@NgModule({
  declarations: [
    ProductSellComponent,
    ProductSellHomeComponent,
    ProductSellDetailComponent,
    ProductSellEditComponent,
    ProductSellListComponent
  ],
  imports: [
    CommonModule,
    ProductSellRoutingModule
  ]
})
export class ProductSellModule { }
