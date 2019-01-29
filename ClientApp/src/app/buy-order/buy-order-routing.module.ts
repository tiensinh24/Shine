import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuyOrderHomeComponent } from './buy-order-home/buy-order-home.component';
import { BuyOrderDetailComponent } from './buy-order-detail/buy-order-detail.component';
import { BuyOrderEditComponent } from './buy-order-edit/buy-order-edit.component';
import { BuyOrderComponent } from './buy-order.component';
import { BuyOrderListComponent } from './buy-order-list/buy-order-list.component';

const routes: Routes = [
  {
    path: '', component: BuyOrderComponent, children:
      [
        { path: '', redirectTo: '/buy-order/home', pathMatch: 'full' },
        { path: 'home', component: BuyOrderHomeComponent },
        { path: 'detail', component: BuyOrderDetailComponent },
        { path: 'edit', component: BuyOrderEditComponent },
        { path: 'list', component: BuyOrderListComponent }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuyOrderRoutingModule { }
