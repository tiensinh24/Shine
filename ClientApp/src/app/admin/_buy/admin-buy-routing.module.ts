import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminBuyComponent } from './admin-buy.component';
import { AuthGuard } from 'src/app/auth/_guards/auth.guard';
import { AdminBuyHomeComponent } from './admin-buy-home/admin-buy-home.component';

const routes: Routes = [
  {
    path: '',
    component: AdminBuyComponent,
    children: [
      { path: '', redirectTo: '/admin/buy/home', pathMatch: 'full' },
      { path: 'home', component: AdminBuyHomeComponent },
      {
        path: 'order',
        canActivate: [AuthGuard],
        loadChildren: () => import('./order/order-buy.module').then(m => m.OrderBuyModule)
      },
      {
        path: 'supplier',
        canActivate: [AuthGuard],
        loadChildren: () => import('./supplier/supplier.module').then(m => m.SupplierModule)
      },
      {
        path: 'product',
        canActivate: [AuthGuard],
        loadChildren: () => import('./product/product-buy.module').then(m => m.ProductBuyModule)
      },
      {
        path: 'category',
        canActivate: [AuthGuard],
        loadChildren: () => import('./category/category-buy.module').then(m => m.CategoryBuyModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminBuyRoutingModule {}
