import { NgModule } from '@angular/core';
import { PaymentEditDialogComponent } from './payment-edit-dialog.component';
import { MaterialSharedModule } from '../../material-shared.module';
import { SharedModule } from '../../shared.module';

@NgModule({
  declarations: [PaymentEditDialogComponent],
  entryComponents: [PaymentEditDialogComponent],
  exports: [PaymentEditDialogComponent],
  imports: [SharedModule, MaterialSharedModule]
})
export class PaymentEditDialogModule {}
