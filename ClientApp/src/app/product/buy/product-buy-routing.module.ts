import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductBuyComponent } from './product-buy.component';
import { ProductBuyHomeComponent } from './product-buy-home/product-buy-home.component';
import { ProductBuyDetailComponent } from './product-buy-detail/product-buy-detail.component';
import { ProductBuyEditComponent } from './product-buy-edit/product-buy-edit.component';
import { ProductBuyListComponent } from './product-buy-list/product-buy-list.component';
import { CanDeactivateGuard } from 'src/app/_guards/can-deactivate.guard';

const routes: Routes = [
  {
    path: '',
    component: ProductBuyComponent,
    children: [
      { path: '', redirectTo: '/product-buy/home', pathMatch: 'full'},
      { path: 'home', component: ProductBuyListComponent },
      { path: 'create', component: ProductBuyEditComponent },
      {
        path: 'edit/:productId',
        component: ProductBuyEditComponent,
        canDeactivate: [CanDeactivateGuard],
      },
      { path: 'list', component: ProductBuyListComponent },
      { path: ':productId', component: ProductBuyDetailComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductBuyRoutingModule {}
