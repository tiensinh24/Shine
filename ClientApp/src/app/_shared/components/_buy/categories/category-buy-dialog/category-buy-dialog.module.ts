import { CategoryBuyDialogComponent } from './category-buy-dialog.component';
import { MaterialSharedModule } from '../../../../material-shared.module';
import { SharedModule } from '../../../../shared.module';
import { NgModule } from '@angular/core';


@NgModule({
  declarations: [CategoryBuyDialogComponent],
  entryComponents: [CategoryBuyDialogComponent],
  exports: [CategoryBuyDialogComponent],
  imports: [
    SharedModule,
    MaterialSharedModule,
  ]
})
export class CategoryBuyDialogModule { }
