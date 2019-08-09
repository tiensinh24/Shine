import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OrderSellEditDialogComponent } from "./order-sell-edit-dialog.component";
import { SharedModule } from "src/app/_shared/shared.module";
import { MaterialSharedModule } from "src/app/_shared/material-shared.module";

@NgModule({
  declarations: [OrderSellEditDialogComponent],
  entryComponents: [OrderSellEditDialogComponent],
  exports: [OrderSellEditDialogComponent],
  imports: [SharedModule, MaterialSharedModule]
})
export class OrderSellEditDialogModule {}
