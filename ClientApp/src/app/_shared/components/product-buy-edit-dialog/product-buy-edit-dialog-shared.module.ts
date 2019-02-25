import { NgModule } from '@angular/core';
import { ProductBuyEditDialogComponent } from './product-buy-edit-dialog.component';
import { SharedModule } from '../../shared.module';
import { MaterialSharedModule } from '../../material-shared.module';

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
