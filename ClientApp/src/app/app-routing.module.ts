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
    { path: 'buy-order', canActivate: [AuthGuard], loadChildren: './buy-order/buy-order.module#BuyOrderModule' },
    { path: 'customer', canActivate: [AuthGuard], loadChildren: './customer/customer.module#CustomerModule' },
    { path: 'employee', canActivate: [AuthGuard], loadChildren: './employee/employee.module#EmployeeModule' },
    { path: 'product-buy', canActivate: [AuthGuard], loadChildren: './product/buy/product-buy.module#ProductBuyModule' },
    { path: 'product-sell', canActivate: [AuthGuard], loadChildren: './product/sell/product-sell.module#ProductSellModule' },
    { path: 'sell-order', canActivate: [AuthGuard], loadChildren: './sell-order/sell-order.module#SellOrderModule' },
    { path: 'supplier', canActivate: [AuthGuard], loadChildren: './supplier/supplier.module#SupplierModule' },
    { path: 'category', canActivate: [AuthGuard], loadChildren: './category/category.module#CategoryModule' },
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
