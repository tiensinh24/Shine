import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductSellComponent } from './product-sell.component';
import { ProductSellDetailComponent } from './product-sell-detail/product-sell-detail.component';
import { ProductSellEditComponent } from './product-sell-edit/product-sell-edit.component';
import { ProductSellListComponent } from './product-sell-list/product-sell-list.component';
import { CanDeactivateGuard } from 'src/app/_shared/_guards/can-deactivate.guard';


const routes: Routes = [
  {
    path: '',
    component: ProductSellComponent,
    children: [
      { path: '', redirectTo: '/product-sell/home', pathMatch: 'full' },
      { path: 'home', component: ProductSellListComponent },
      { path: 'create', component: ProductSellEditComponent },
      {
        path: 'edit/:productId',
        component: ProductSellEditComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      { path: 'list', component: ProductSellListComponent },
      { path: ':productId', component: ProductSellDetailComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductSellRoutingModule { }
