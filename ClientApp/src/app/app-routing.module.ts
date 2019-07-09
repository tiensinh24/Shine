import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { PageNotFoundComponent } from './_shared/components/page-not-found/page-not-found.component';
import { LogInComponent } from './_shared/components/log-in/log-in.component';
import { AuthGuard } from './auth/_guards/auth.guard';
import { HomeComponent } from './main/home/home.component';

// Lazy-load child routes
const routes: Routes = [
    { path: 'login', component: LogInComponent },
    { path: 'login/:redirectUrl', component: LogInComponent },
    { path: 'admin', canActivate: [AuthGuard], loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
   
    // manager parent
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
    exports: [RouterModule],
})
export class AppRoutingModule { }
