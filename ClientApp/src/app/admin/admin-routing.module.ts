import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/_guards/auth.guard';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { PageNotFoundComponent } from '../_shared/components/page-not-found/page-not-found.component';
import { AdminComponent } from './admin.component';

// Lazy-load child routes
const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: '/admin/home', pathMatch: 'full' },
      { path: 'home', component: AdminDashboardComponent },
      { path: 'order-buy', canActivate: [AuthGuard], loadChildren: () => import('./_buy/order/order-buy.module').then(m => m.OrderBuyModule) },
      { path: 'order-sell', canActivate: [AuthGuard], loadChildren: () => import('./_sell/order/order-sell.module').then(m => m.OrderSellModule) },
      { path: 'supplier', canActivate: [AuthGuard], loadChildren: () => import('./_buy/supplier/supplier.module').then(m => m.SupplierModule) },
      { path: 'employee', canActivate: [AuthGuard], loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule) },
      { path: 'product-buy', canActivate: [AuthGuard], loadChildren: () => import('./_buy/product/product-buy.module').then(m => m.ProductBuyModule) },
      { path: 'product-sell', canActivate: [AuthGuard], loadChildren: () => import('./_sell/product/product-sell.module').then(m => m.ProductSellModule) },
      { path: 'category-buy', canActivate: [AuthGuard], loadChildren: () => import('./_buy/category/category-buy.module').then(m => m.CategoryBuyModule) },
      { path: 'category-sell', canActivate: [AuthGuard], loadChildren: () => import('./_sell/category/category-sell.module').then(m => m.CategorySellModule) },
      { path: 'storage', canActivate: [AuthGuard], loadChildren: () => import('./storage/storage.module').then(m => m.StorageModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
