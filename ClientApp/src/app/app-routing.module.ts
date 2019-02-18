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
    { path: 'admin', canActivate: [AuthGuard], loadChildren: './admin/admin.module#AdminModule' },
    { path: 'order-buy', canActivate: [AuthGuard], loadChildren: './order/buy/order-buy.module#OrderBuyModule' },
    { path: 'order-sell', canActivate: [AuthGuard], loadChildren: './order/sell/order-sell.module#OrderSellModule' },
    { path: 'customer', canActivate: [AuthGuard], loadChildren: './customer/customer.module#CustomerModule' },
    { path: 'employee', canActivate: [AuthGuard], loadChildren: './employee/employee.module#EmployeeModule' },
    { path: 'product-buy', canActivate: [AuthGuard], loadChildren: './product/buy/product-buy.module#ProductBuyModule' },
    { path: 'product-sell', canActivate: [AuthGuard], loadChildren: './product/sell/product-sell.module#ProductSellModule' },
    { path: 'supplier', canActivate: [AuthGuard], loadChildren: './supplier/supplier.module#SupplierModule' },
    { path: 'category-buy', canActivate: [AuthGuard], loadChildren: './category/buy/category-buy.module#CategoryBuyModule' },
    // manager parent
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
