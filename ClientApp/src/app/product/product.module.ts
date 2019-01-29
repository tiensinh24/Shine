import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ProductRoutingModule } from './product-routing.module';
import { ProductHomeComponent } from './product-home/product-home.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductListComponent } from './product-list/product-list.component';
import { MatPaginatorModule, MatSortModule, MatFormFieldModule, MatTableModule,
  MatInputModule, MatSelectModule, MatOptionModule, MatIconModule, MatCardModule } from '@angular/material';
import { ProductComponent } from './product.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProductHomeComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ProductListComponent,
    ProductComponent,

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
    ReactiveFormsModule,

    ProductRoutingModule,
  ]
})
export class ProductModule { }
