import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderSellComponent } from './order-sell.component';
import { OrderSellHomeComponent } from './order-sell-home/order-sell-home.component';
import { OrderSellEditComponent } from './order-sell-edit/order-sell-edit.component';
import { CanDeactivateGuard } from 'src/app/_guards/can-deactivate.guard';
import { OrderSellListComponent } from './order-sell-list/order-sell-list.component';
import { OrderSellDetailComponent } from './order-sell-detail/order-sell-detail.component';

const routes: Routes = [
  {
    path: '',
    component: OrderSellComponent,
    children: [
      { path: '', redirectTo: '/order-sell/home', pathMatch: 'full' },
      { path: 'home', component: OrderSellHomeComponent },
      { path: 'create', component: OrderSellEditComponent },
      {
        path: 'edit/:orderId',
        component: OrderSellEditComponent,
        canDeactivate: [CanDeactivateGuard],
      },
      { path: 'list', component: OrderSellListComponent },
      { path: ':orderId', component: OrderSellDetailComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderSellRoutingModule { }
