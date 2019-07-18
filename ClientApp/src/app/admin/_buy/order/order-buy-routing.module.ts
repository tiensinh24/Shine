import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrderBuyDetailComponent } from './order-buy-detail/order-buy-detail.component';
import { OrderBuyHomeComponent } from './order-buy-home/order-buy-home.component';

import { OrderBuyComponent } from './order-buy.component';
import { OrderBuyCreateComponent } from './order-buy-create/order-buy-create.component';
import { OrderBuyEditComponent } from './order-buy-edit/order-buy-edit.component';

const routes: Routes = [
  {
    path: '',
    component: OrderBuyComponent,
    children: [
      { path: '', redirectTo: '/admin/order-buy/home', pathMatch: 'full' },
      { path: 'home', component: OrderBuyHomeComponent },
      { path: 'create', component: OrderBuyCreateComponent },
      { path: 'report', loadChildren: () => import('../../../main/_reports/order-buy-report.module').then(m => m.OrderBuyReportModule) },
      { path: ':orderId', component: OrderBuyDetailComponent },
      { path: ':orderId/edit', component: OrderBuyEditComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderBuyRoutingModule {}
