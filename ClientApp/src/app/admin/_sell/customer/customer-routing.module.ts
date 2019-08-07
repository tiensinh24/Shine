import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CustomerComponent } from "./customer.component";
import { CustomerListHomeComponent } from "./customer-list/customer-list-home.component";
import { CustomerEditComponent } from "./customer-edit/customer-edit.component";

const routes: Routes = [
  {
    path: "",
    component: CustomerComponent,
    children: [
      { path: "", redirectTo: "/admin/sell/customer/home", pathMatch: "full" },
      { path: "home", component: CustomerListHomeComponent },
      { path: "create", component: CustomerEditComponent },
      { path: ":customerId/edit", component: CustomerEditComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule {}
