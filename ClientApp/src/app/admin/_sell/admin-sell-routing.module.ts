import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminSellComponent } from "./admin-sell.component";
import { AuthGuard } from "src/app/auth/_guards/auth.guard";
import { AdminSellHomeComponent } from "./admin-sell-home/admin-sell-home.component";

const routes: Routes = [
  {
    path: "",
    component: AdminSellComponent,
    children: [
      { path: "", redirectTo: "/admin/sell/home", pathMatch: "full" },
      { path: "home", component: AdminSellHomeComponent },
      {
        path: "order",
        canActivate: [AuthGuard],
        loadChildren: () =>
          import("./order/order-sell.module").then(m => m.OrderSellModule)
      },
      {
        path: "customer",
        canActivate: [AuthGuard],
        loadChildren: () =>
          import("./customer/customer.module").then(m => m.CustomerModule)
      },
      {
        path: "product",
        canActivate: [AuthGuard],
        loadChildren: () =>
          import("./product/product-sell.module").then(m => m.ProductSellModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminSellRoutingModule {}
