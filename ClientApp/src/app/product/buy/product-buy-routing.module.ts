import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductBuyComponent } from './product-buy.component';
import { ProductBuyHomeComponent } from './product-buy-home/product-buy-home.component';
import { ProductBuyDetailComponent } from './product-buy-detail/product-buy-detail.component';
import { ProductBuyEditComponent } from './product-buy-edit/product-buy-edit.component';
import { ProductBuyListComponent } from './product-buy-list/product-buy-list.component';


const routes: Routes = [
  {
    path: '', component: ProductBuyComponent, children:
      [
        { path: '', redirectTo: '/product-buy/home', pathMatch: 'full' },
        { path: 'home', component: ProductBuyHomeComponent },
        { path: 'create', component: ProductBuyEditComponent },
        { path: 'edit/:productId', component: ProductBuyEditComponent },
        { path: 'list', component: ProductBuyListComponent },
        { path: ':productId', component: ProductBuyDetailComponent },
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductBuyRoutingModule { }
