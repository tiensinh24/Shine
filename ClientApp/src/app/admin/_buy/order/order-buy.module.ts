import { OrderBuyDetailComponent } from './order-buy-detail/order-buy-detail.component';
import { OrderBuyHomeComponent } from './order-buy-home/order-buy-home.component';
import { OrderBuyListComponent } from './order-buy-list/order-buy-list.component';
import { OrderBuyRoutingModule } from './order-buy-routing.module';
import { OrderBuyComponent } from './order-buy.component';
import { NgModule } from '@angular/core';
import { OrderBuyEditDialogModule as OrderBuyEditDialogModule } from 'src/app/_shared/components/_buy/orders/order-buy-edit-dialog/order-buy-edit-dialog.module';
import { OrderProductsEditDialogModule } from 'src/app/_shared/components/order-products-edit-dialog/order-products-edit-dialog.module';
import { PaymentEditDialogModule } from 'src/app/_shared/components/payment-edit-dialog/payment-edit-dialog.module';
import { MaterialSharedModule } from 'src/app/_shared/material-shared.module';
import { SharedModule } from 'src/app/_shared/shared.module';
import { OrderBuyCreateComponent } from './order-buy-create/order-buy-create.component';
import { OrderBuyAddProductsComponent } from './order-buy-create/order-buy-add-products/order-buy-add-products.component';
import { OrderBuyAddPaymentsComponent } from './order-buy-create/order-buy-add-payments/order-buy-add-payments.component';
import { OrderBuyAddCostsComponent } from './order-buy-create/order-buy-add-costs/order-buy-add-costs.component';
import { StarRatingModule } from 'angular-star-rating';
import { OrderBuyEditComponent } from './order-buy-edit/order-buy-edit.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { CostEditDialogModule } from 'src/app/_shared/components/cost-edit-dialog/cost-edit-dialog.module';

@NgModule({
  declarations: [
    OrderBuyComponent,
    OrderBuyDetailComponent,
    OrderBuyHomeComponent,
    OrderBuyListComponent,
    OrderBuyCreateComponent,
    OrderBuyAddProductsComponent,
    OrderBuyAddPaymentsComponent,
    OrderBuyAddCostsComponent,
    OrderBuyEditComponent
  ],
  imports: [
    // Shared
    SharedModule,

    // Dialog
    OrderBuyEditDialogModule,
    OrderProductsEditDialogModule,
    PaymentEditDialogModule,
    CostEditDialogModule,

    // Material
    MaterialSharedModule,

    // Star rating
    StarRatingModule,

    // Google charts
    GoogleChartsModule,

    // Routing
    OrderBuyRoutingModule
  ]
})
export class OrderBuyModule {}
