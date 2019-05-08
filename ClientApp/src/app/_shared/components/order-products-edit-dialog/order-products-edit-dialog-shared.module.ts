import { NgModule } from '@angular/core';
import { OrderProductsEditDialogComponent } from './order-products-edit-dialog.component';
import { MaterialSharedModule } from '../../material-shared.module';
import { SharedModule } from '../../shared.module';

@NgModule({
  declarations: [OrderProductsEditDialogComponent],
  entryComponents: [OrderProductsEditDialogComponent],
  exports: [OrderProductsEditDialogComponent],
  imports: [SharedModule, MaterialSharedModule]
})
export class OrderProductsEditDialogSharedModule {}
