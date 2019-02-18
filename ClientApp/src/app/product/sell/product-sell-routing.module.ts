import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductSellComponent } from './product-sell.component';
import { ProductSellHomeComponent } from './product-sell-home/product-sell-home.component';
import { ProductSellDetailComponent } from './product-sell-detail/product-sell-detail.component';
import { ProductSellEditComponent } from './product-sell-edit/product-sell-edit.component';
import { ProductSellListComponent } from './product-sell-list/product-sell-list.component';

const routes: Routes = [
  {
    path: '',
    component: ProductSellComponent,
    children: [
      { path: '', redirectTo: '/product-sell/home', pathMatch: 'full' },
      { path: 'home', component: ProductSellHomeComponent },
      { path: 'detail', component: ProductSellDetailComponent },
      { path: 'create', component: ProductSellEditComponent },
      { path: 'edit/:id', component: ProductSellEditComponent },
      { path: 'list', component: ProductSellListComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductSellRoutingModule {}
