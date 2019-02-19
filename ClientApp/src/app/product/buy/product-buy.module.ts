import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule, MatSortModule, MatFormFieldModule, MatTableModule,
  MatInputModule, MatSelectModule, MatOptionModule, MatIconModule,
  MatCardModule, MatButtonModule, MatDialogModule, MatTooltipModule, MatGridListModule, MatSlideToggleModule } from '@angular/material';

import { ProductBuyRoutingModule } from './product-buy-routing.module';
import { ProductBuyComponent } from './product-buy.component';
import { ProductBuyHomeComponent } from './product-buy-home/product-buy-home.component';
import { ProductBuyDetailComponent } from './product-buy-detail/product-buy-detail.component';
import { ProductBuyEditComponent } from './product-buy-edit/product-buy-edit.component';
import { ProductBuyListComponent } from './product-buy-list/product-buy-list.component';
import { CategoryBuyDialogComponent } from 'src/app/category/buy/_dialogs/category-buy-dialog/category-buy-dialog.component';

@NgModule({
  declarations: [
    ProductBuyComponent,
    ProductBuyHomeComponent,
    ProductBuyDetailComponent,
    ProductBuyEditComponent,
    ProductBuyListComponent,
    CategoryBuyDialogComponent

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
    ProductBuyRoutingModule,
  ],
  entryComponents: [
    CategoryBuyDialogComponent
  ]
})
export class ProductBuyModule { }
