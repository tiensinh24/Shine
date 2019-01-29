import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SellOrderHomeComponent } from './sell-order-home/sell-order-home.component';
import { SellOrderDetailComponent } from './sell-order-detail/sell-order-detail.component';
import { SellOrderEditComponent } from './sell-order-edit/sell-order-edit.component';
import { SellOrderListComponent } from './sell-order-list/sell-order-list.component';
import { SellOrderComponent } from './sell-order.component';

const routes: Routes = [
  {
    path: '', component: SellOrderComponent, children:
      [
        { path: '', redirectTo: '/sell-order/home', pathMatch: 'full' },
        { path: 'home', component: SellOrderHomeComponent },
        { path: 'detail', component: SellOrderDetailComponent },
        { path: 'edit', component: SellOrderEditComponent },
        { path: 'list', component: SellOrderListComponent }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellOrderRoutingModule { }
