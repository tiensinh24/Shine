import { CategoryBuyDetailComponent } from './category-buy-detail/category-buy-detail.component';
import { CategoryBuyEditComponent } from './category-buy-edit/category-buy-edit.component';
import { CategoryBuyHomeComponent } from './category-buy-home/category-buy-home.component';
import { CategoryBuyListComponent } from './category-buy-list/category-buy-list.component';
import { CategoryRoutingModule } from './category-buy-routing.module';
import { CategoryBuyComponent } from './category-buy.component';
import { NgModule } from '@angular/core';
import { CategoryBuyDialogModule } from 'src/app/_shared/components/_buy/categories/category-buy-dialog/category-buy-dialog.module';
import { ConfirmDialogModule } from 'src/app/_shared/components/confirm-dialog/confirm-dialog.module';
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
    ConfirmDialogModule,
    CategoryBuyDialogModule,

    // Routing
    CategoryRoutingModule,
  ],
})
export class CategoryBuyModule {}
