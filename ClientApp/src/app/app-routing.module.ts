import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LogInComponent } from './log-in/log-in.component';
import { AuthGuard } from './auth/_guards/auth.guard';

// Lazy-load child routes
const routes: Routes = [
    { path: 'login', component: LogInComponent },
    { path: 'login/:redirectUrl', component: LogInComponent },
    { path: 'admin', canActivate: [AuthGuard], loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
    { path: 'order-buy', canActivate: [AuthGuard], loadChildren: () => import('./order/buy/order-buy.module').then(m => m.OrderBuyModule) },
    { path: 'order-sell', canActivate: [AuthGuard], loadChildren: () => import('./order/sell/order-sell.module').then(m => m.OrderSellModule) },
    { path: 'customer', canActivate: [AuthGuard], loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule) },
    { path: 'supplier', canActivate: [AuthGuard], loadChildren: () => import('./supplier/supplier.module').then(m => m.SupplierModule) },
    { path: 'employee', canActivate: [AuthGuard], loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule) },
    { path: 'product-buy', canActivate: [AuthGuard], loadChildren: () => import('./product/buy/product-buy.module').then(m => m.ProductBuyModule) },
    { path: 'product-sell', canActivate: [AuthGuard], loadChildren: () => import('./product/sell/product-sell.module').then(m => m.ProductSellModule) },
    { path: 'category-buy', canActivate: [AuthGuard], loadChildren: () => import('./category/buy/category-buy.module').then(m => m.CategoryBuyModule) },
    { path: 'category-sell', canActivate: [AuthGuard], loadChildren: () => import('./category/sell/category-sell.module').then(m => m.CategorySellModule) },
    { path: 'storage', canActivate: [AuthGuard], loadChildren: () => import('./storage/storage.module').then(m => m.StorageModule) },
    // manager parent
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
    exports: [RouterModule],
})
export class AppRoutingModule { }
