import { NgModule } from "@angular/core";

import { OrderSellRoutingModule } from "./order-sell-routing.module";
import { OrderSellComponent } from "./order-sell.component";
import { OrderSellDetailComponent } from "./order-sell-detail/order-sell-detail.component";
import { OrderSellHomeComponent } from "./order-sell-home/order-sell-home.component";
import { OrderSellListComponent } from "./order-sell-list/order-sell-list.component";
import { OrderSellCreateComponent } from "./order-sell-create/order-sell-create.component";
import { OrderSellAddCostComponent } from "./order-sell-create/order-sell-add-cost/order-sell-add-cost.component";
import { OrderSellAddPaymentsComponent } from "./order-sell-create/order-sell-add-payments/order-sell-add-payments.component";
import { OrderSellAddProductsComponent } from "./order-sell-create/order-sell-add-products/order-sell-add-products.component";
import { SharedModule } from "src/app/_shared/shared.module";
import { MaterialSharedModule } from "src/app/_shared/material-shared.module";
import { StarRatingModule } from "angular-star-rating";
import { GoogleChartsModule } from "angular-google-charts";
import { OrderProductsEditDialogModule } from "src/app/_shared/components/order-products-edit-dialog/order-products-edit-dialog.module";
import { PaymentEditDialogModule } from "src/app/_shared/components/payment-edit-dialog/payment-edit-dialog.module";
import { CostEditDialogModule } from "src/app/_shared/components/cost-edit-dialog/cost-edit-dialog.module";
import { OrderSellEditDialogModule } from "src/app/_shared/components/_sell/orders/order-sell-edit-dialog/order-sell-edit-dialog.module";
import { OrderSellEditComponent } from './order-sell-edit/order-sell-edit.component';

@NgModule({
  declarations: [
    OrderSellComponent,
    OrderSellDetailComponent,
    OrderSellHomeComponent,
    OrderSellListComponent,
    OrderSellCreateComponent,
    OrderSellAddCostComponent,
    OrderSellAddPaymentsComponent,
    OrderSellAddProductsComponent,
    OrderSellEditComponent
  ],
  imports: [
    // Shared
    SharedModule,

    // Dialog
    OrderSellEditDialogModule,
    OrderProductsEditDialogModule,
    PaymentEditDialogModule,
    CostEditDialogModule,

    // Material
    MaterialSharedModule,

    // Star rating
    StarRatingModule,

    // GOogle charts
    GoogleChartsModule,

    // Routing
    OrderSellRoutingModule
  ]
})
export class OrderSellModule {}
