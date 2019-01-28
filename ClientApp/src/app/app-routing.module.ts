import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LogInComponent } from './log-in/log-in.component';

// Lazy-load child routes (good)
const routes: Routes = [
    { path: 'login', component: LogInComponent },
    { path: 'login/:redirectUrl', component: LogInComponent },
    { path: 'buy-order', loadChildren: './buy-order/buy-order.module#BuyOrderModule' },
    { path: 'customer', loadChildren: './customer/customer.module#CustomerModule' },
    { path: 'employee', loadChildren: './employee/employee.module#EmployeeModule' },
    { path: 'product', loadChildren: './product/product.module#ProductModule' },
    { path: 'sell-order', loadChildren: './sell-order/sell-order.module#SellOrderModule' },
    { path: 'supplier', loadChildren: './supplier/supplier.module#SupplierModule' },
    // manager parent
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
