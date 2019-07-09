import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard } from 'src/app/_shared/guards/can-deactivate.guard';
import { ProductBuyDetailComponent } from './product-buy-detail/product-buy-detail.component';
import { ProductBuyEditComponent } from './product-buy-edit/product-buy-edit.component';
import { ProductBuyListComponent } from './product-buy-list/product-buy-list.component';
import { ProductBuyRemainComponent } from './product-buy-remain/product-buy-remain.component';
import { ProductBuyComponent } from './product-buy.component';

const routes: Routes = [
  {
    path: '',
    component: ProductBuyComponent,
    children: [
      { path: '', redirectTo: '/admin/product-buy/home', pathMatch: 'full' },
      { path: 'home', component: ProductBuyListComponent },
      { path: 'create', component: ProductBuyEditComponent },
      { path: 'remain', component: ProductBuyRemainComponent },
      {
        path: 'edit/:productId',
        component: ProductBuyEditComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      { path: 'list', component: ProductBuyListComponent },
      { path: ':productId', component: ProductBuyDetailComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductBuyRoutingModule {}
