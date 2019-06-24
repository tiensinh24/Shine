import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared.module';
import { MaterialSharedModule } from '../../../material-shared.module';
import { OrderBuyEditDialogComponent } from './order-buy-edit-dialog.component';

@NgModule({
  declarations: [OrderBuyEditDialogComponent],
  entryComponents: [OrderBuyEditDialogComponent],
  exports: [OrderBuyEditDialogComponent],
  imports: [
    SharedModule,
    MaterialSharedModule,
  ]
})
export class OrderBuyEditDialogSharedModule { }
