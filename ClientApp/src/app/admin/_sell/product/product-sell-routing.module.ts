import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ProductSellComponent } from "./product-sell.component";
import { ProductSellEditComponent } from "./product-sell-edit/product-sell-edit.component";
import { ProductSellListComponent } from "./product-sell-list/product-sell-list.component";
import { CanDeactivateGuard } from "src/app/_shared/guards/can-deactivate.guard";

const routes: Routes = [
  {
    path: "",
    component: ProductSellComponent,
    children: [
      { path: "", redirectTo: "/admin/sell/product/home", pathMatch: "full" },
      { path: "home", component: ProductSellListComponent },
      { path: "create", component: ProductSellEditComponent },
      {
        path: "edit/:productId",
        component: ProductSellEditComponent,
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductSellRoutingModule {}
