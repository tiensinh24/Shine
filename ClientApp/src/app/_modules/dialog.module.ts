import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryBuyModule } from '../category/buy/category-buy.module';
import { ProductBuyModule } from '../product/buy/product-buy.module';
import { FormsModule } from '@angular/forms';
import { CategoryBuyDialogComponent } from '../_shared/components/category-buy-dialog/category-buy-dialog.component';

@NgModule({
  declarations: [CategoryBuyDialogComponent],
  imports: [
    ProductBuyModule,
    CategoryBuyModule,
  ],
  exports: [
    CategoryBuyDialogComponent,

    ProductBuyModule,
    CategoryBuyModule,
  ],
  entryComponents: [
    CategoryBuyDialogComponent,
  ]
})
export class DialogModule { }
