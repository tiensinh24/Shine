import { NgModule } from "@angular/core";
import { CategorySellDialogComponent } from "./category-sell-dialog.component";
import { SharedModule } from "src/app/_shared/shared.module";
import { MaterialSharedModule } from "src/app/_shared/material-shared.module";

@NgModule({
  declarations: [CategorySellDialogComponent],
  entryComponents: [CategorySellDialogComponent],
  exports: [CategorySellDialogComponent],
  imports: [SharedModule, MaterialSharedModule]
})
export class CategorySellDialogModule {}
