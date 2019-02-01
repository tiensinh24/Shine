import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ProductBuyRoutingModule } from './product-buy-routing.module';

import { MatPaginatorModule, MatSortModule, MatFormFieldModule, MatTableModule,
  MatInputModule, MatSelectModule, MatOptionModule, MatIconModule,
  MatCardModule, MatButtonModule, MatDialogModule } from '@angular/material';
import { ProductBuyComponent } from './product-buy.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryEditComponent } from '../../category/category-edit/category-edit.component';
import { ProductBuyHomeComponent } from './product-buy-home/product-buy-home.component';
import { ProductBuyDetailComponent } from './product-buy-detail/product-buy-detail.component';
import { ProductBuyEditComponent } from './product-buy-edit/product-buy-edit.component';
import { ProductBuyListComponent } from './product-buy-list/product-buy-list.component';

@NgModule({
  declarations: [
    ProductBuyComponent,
    ProductBuyHomeComponent,
    ProductBuyDetailComponent,
    ProductBuyEditComponent,
    ProductBuyListComponent,

    CategoryEditComponent

  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
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
    ReactiveFormsModule,

    MatDialogModule,

    ProductBuyRoutingModule,
  ],
  entryComponents: [
    CategoryEditComponent
  ]
})
export class ProductBuyModule { }
