import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { OrderSellComponent } from "./order-sell.component";
import { OrderSellHomeComponent } from "./order-sell-home/order-sell-home.component";
import { OrderSellCreateComponent } from "./order-sell-create/order-sell-create.component";
import { OrderSellDetailComponent } from "./order-sell-detail/order-sell-detail.component";
import { OrderSellEditComponent } from "./order-sell-edit/order-sell-edit.component";

const routes: Routes = [
  {
    path: "",
    component: OrderSellComponent,
    children: [
      { path: "", redirectTo: "/admin/sell/order/home", pathMatch: "full" },
      { path: "home", component: OrderSellHomeComponent },
      { path: "create", component: OrderSellCreateComponent },
      { path: ":orderId", component: OrderSellDetailComponent },
      { path: ":orderId/edit", component: OrderSellEditComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderSellRoutingModule {}
