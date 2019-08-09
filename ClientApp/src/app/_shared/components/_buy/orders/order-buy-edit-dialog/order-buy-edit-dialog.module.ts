import { OrderBuyEditDialogComponent } from './order-buy-edit-dialog.component';
import { MaterialSharedModule } from '../../../../material-shared.module';
import { SharedModule } from '../../../../shared.module';
import { NgModule } from '@angular/core';


@NgModule({
  declarations: [OrderBuyEditDialogComponent],
  entryComponents: [OrderBuyEditDialogComponent],
  exports: [OrderBuyEditDialogComponent],
  imports: [
    SharedModule,
    MaterialSharedModule,
  ]
})
export class OrderBuyEditDialogModule { }
