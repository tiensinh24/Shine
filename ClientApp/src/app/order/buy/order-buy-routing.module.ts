import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderBuyDetailComponent } from './order-buy-detail/order-buy-detail.component';
import { OrderBuyHomeComponent } from './order-buy-home/order-buy-home.component';
import { OrderBuyListComponent } from './order-buy-list/order-buy-list.component';
import { OrderBuyComponent } from './order-buy.component';



const routes: Routes = [
  {
    path: '',
    component: OrderBuyComponent,
    children: [
      { path: '', redirectTo: '/order-buy/home', pathMatch: 'full' },
      { path: 'home', component: OrderBuyHomeComponent },
      { path: 'list', component: OrderBuyListComponent },
      { path: ':orderId', component: OrderBuyDetailComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderBuyRoutingModule {}
