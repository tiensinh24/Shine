import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderBuyComponent } from './order-buy.component';
import { OrderBuyHomeComponent } from './order-buy-home/order-buy-home.component';
import { OrderBuyEditComponent } from './order-buy-edit/order-buy-edit.component';
import { OrderBuyListComponent } from './order-buy-list/order-buy-list.component';
import { OrderBuyDetailComponent } from './order-buy-detail/order-buy-detail.component';
import { CanDeactivateGuard } from 'src/app/_shared/_guards/can-deactivate.guard';

const routes: Routes = [
  {
    path: '',
    component: OrderBuyComponent,
    children: [
      { path: '', redirectTo: '/order-buy/home', pathMatch: 'full' },
      { path: 'home', component: OrderBuyHomeComponent },
      { path: 'create', component: OrderBuyEditComponent },
      {
        path: ':orderId/edit',
        component: OrderBuyEditComponent,
        canDeactivate: [CanDeactivateGuard],
      },
      { path: 'list', component: OrderBuyListComponent },
      { path: ':orderId', component: OrderBuyDetailComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderBuyRoutingModule { }
