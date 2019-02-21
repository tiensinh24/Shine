import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryBuyDialogComponent } from '../category/buy/_dialogs/category-buy-dialog/category-buy-dialog.component';
import { CategoryBuyModule } from '../category/buy/category-buy.module';
import { ProductBuyModule } from '../product/buy/product-buy.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CategoryBuyDialogComponent],
  imports: [
    CommonModule,
  ],
  exports: [
    CategoryBuyDialogComponent,

    CommonModule,
    FormsModule,
  ]
})
export class DialogModule { }
