import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductHomeComponent } from './product-home/product-home.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductListComponent } from './product-list/product-list.component';
import { MatPaginatorModule, MatSortModule, MatFormFieldModule, MatTableModule, MatInputModule } from '@angular/material';

@NgModule({
  declarations: [
    ProductHomeComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ProductListComponent
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    ProductRoutingModule,
  ]
})
export class ProductModule { }
