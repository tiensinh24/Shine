import { CategoryBuyDetailComponent } from './category-buy-detail/category-buy-detail.component';
import { CategoryBuyEditComponent } from './category-buy-edit/category-buy-edit.component';
import { CategoryBuyHomeComponent } from './category-buy-home/category-buy-home.component';
import { CategoryBuyListComponent } from './category-buy-list/category-buy-list.component';
import { CategoryRoutingModule } from './category-buy-routing.module';
import { CategoryBuyComponent } from './category-buy.component';
import { NgModule } from '@angular/core';
import { CategoryBuyDialogSharedModule } from 'src/app/_shared/components/_buy/categories/category-buy-dialog/category-buy-dialog-shared.module';
import { ConfirmDialogSharedModule } from 'src/app/_shared/components/confirm-dialog/confirm-dialog-shared.module';
import { MaterialSharedModule } from 'src/app/_shared/material-shared.module';
import { SharedModule } from 'src/app/_shared/shared.module';



@NgModule({
  declarations: [
    CategoryBuyComponent,
    CategoryBuyHomeComponent,
    CategoryBuyEditComponent,
    CategoryBuyListComponent,
    CategoryBuyDetailComponent,
    
  ],
  imports: [
    // Shared
    SharedModule,

    // Material
    MaterialSharedModule,

    // Dialog
    ConfirmDialogSharedModule,
    CategoryBuyDialogSharedModule,

    // Routing
    CategoryRoutingModule,
  ],
})
export class CategoryBuyModule {}
