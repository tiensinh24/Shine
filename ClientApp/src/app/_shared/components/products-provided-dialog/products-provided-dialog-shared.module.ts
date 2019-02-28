import { NgModule } from '@angular/core';

import { ProductsProvidedDialogComponent } from './products-provided-dialog.component';
import { SharedModule } from '../../shared.module';
import { MaterialSharedModule } from '../../material-shared.module';

@NgModule({
  declarations: [ProductsProvidedDialogComponent],
  entryComponents: [ProductsProvidedDialogComponent],
  exports: [ProductsProvidedDialogComponent],
  imports: [
    SharedModule,
    MaterialSharedModule,
  ]
})
export class ProductsProvidedDialogSharedModule { }
