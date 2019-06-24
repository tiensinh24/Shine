import { NgModule } from '@angular/core';

import { CategoryBuyDialogComponent } from './category-buy-dialog.component';
import { SharedModule } from '../../../shared.module';
import { MaterialSharedModule } from '../../../material-shared.module';

@NgModule({
  declarations: [CategoryBuyDialogComponent],
  entryComponents: [CategoryBuyDialogComponent],
  exports: [CategoryBuyDialogComponent],
  imports: [
    SharedModule,
    MaterialSharedModule,
  ]
})
export class CategoryBuyDialogSharedModule { }
