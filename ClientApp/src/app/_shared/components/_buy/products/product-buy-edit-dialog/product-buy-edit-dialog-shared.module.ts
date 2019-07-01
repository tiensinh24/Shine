import { ProductBuyEditDialogComponent } from './product-buy-edit-dialog.component';
import { MaterialSharedModule } from '../../../../material-shared.module';
import { SharedModule } from '../../../../shared.module';
import { NgModule } from '@angular/core';


@NgModule({
  declarations: [ProductBuyEditDialogComponent],
  entryComponents: [ProductBuyEditDialogComponent],
  exports: [ProductBuyEditDialogComponent],
  imports: [
    SharedModule,
    MaterialSharedModule,
  ]
})
export class ProductBuyEditDialogSharedModule { }
