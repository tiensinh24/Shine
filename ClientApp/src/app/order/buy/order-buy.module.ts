import { NgModule } from '@angular/core';
import { OrderBuyEditDialogSharedModule } from 'src/app/_shared/components/order-buy-edit-dialog/order-buy-edit-dialog-shared.module';
import { OrderProductsEditDialogSharedModule } from 'src/app/_shared/components/order-products-edit-dialog/order-products-edit-dialog-shared.module';
import { PaymentEditDialogSharedModule } from 'src/app/_shared/components/payment-edit-dialog/payment-edit-dialog-shared.module';
import { MaterialSharedModule } from 'src/app/_shared/material-shared.module';
import { SharedModule } from 'src/app/_shared/shared.module';
import { OrderBuyAddCostsComponent } from './order-buy-create/order-buy-add-costs/order-buy-add-costs.component';
import { OrderBuyAddPaymentsComponent } from './order-buy-create/order-buy-add-payments/order-buy-add-payments.component';
import { OrderBuyAddProductsComponent } from './order-buy-create/order-buy-add-products/order-buy-add-products.component';
import { OrderBuyCreateComponent } from './order-buy-create/order-buy-create.component';
import { OrderBuyDetailComponent } from './order-buy-detail/order-buy-detail.component';
import { OrderBuyHomeComponent } from './order-buy-home/order-buy-home.component';
import { OrderBuyListComponent } from './order-buy-list/order-buy-list.component';
import { OrderBuyRoutingModule } from './order-buy-routing.module';
import { OrderBuyComponent } from './order-buy.component';

@NgModule({
  declarations: [
    OrderBuyComponent,
    OrderBuyDetailComponent,
    OrderBuyHomeComponent,
    OrderBuyListComponent,
    OrderBuyCreateComponent,
    OrderBuyAddProductsComponent,
    OrderBuyAddPaymentsComponent,
    OrderBuyAddCostsComponent
  ],
  imports: [
    // Shared
    SharedModule,

    // Dialog
    OrderBuyEditDialogSharedModule,
    OrderProductsEditDialogSharedModule,
    PaymentEditDialogSharedModule,

    // Material
    MaterialSharedModule,

    // Routing
    OrderBuyRoutingModule
  ]
})
export class OrderBuyModule {}
