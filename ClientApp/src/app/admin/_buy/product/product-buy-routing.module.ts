import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard } from 'src/app/_shared/guards/can-deactivate.guard';

import { ProductBuyEditComponent } from './product-buy-edit/product-buy-edit.component';
import { ProductBuyListComponent } from './product-buy-list/product-buy-list.component';
import { ProductBuyComponent } from './product-buy.component';

const routes: Routes = [
  {
    path: '',
    component: ProductBuyComponent,
    children: [
      { path: '', redirectTo: '/admin/product-buy/home', pathMatch: 'full' },
      { path: 'home', component: ProductBuyListComponent },
      { path: 'create', component: ProductBuyEditComponent },
      {
        path: 'edit/:productId',
        component: ProductBuyEditComponent,
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductBuyRoutingModule {}
