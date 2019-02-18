import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatPaginatorModule,
  MatSortModule,
  MatTableModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatOptionModule,
  MatIconModule,
  MatCardModule,
  MatButtonModule,
  MatTooltipModule,
  MatDialogModule,
  MatGridListModule,
  MatSlideToggleModule,
} from '@angular/material';

import { ProductSellRoutingModule } from './product-sell-routing.module';
import { ProductSellComponent } from './product-sell.component';
import { ProductSellHomeComponent } from './product-sell-home/product-sell-home.component';
import { ProductSellDetailComponent } from './product-sell-detail/product-sell-detail.component';
import { ProductSellEditComponent } from './product-sell-edit/product-sell-edit.component';
import { ProductSellListComponent } from './product-sell-list/product-sell-list.component';

@NgModule({
  declarations: [
    ProductSellComponent,
    ProductSellHomeComponent,
    ProductSellDetailComponent,
    ProductSellEditComponent,
    ProductSellListComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatGridListModule,
    MatSlideToggleModule,
    ProductSellRoutingModule,
  ],
})
export class ProductSellModule {}
