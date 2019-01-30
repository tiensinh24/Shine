import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ProductRoutingModule } from './product-routing.module';
import { ProductHomeComponent } from './product-home/product-home.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductListComponent } from './product-list/product-list.component';
import { MatPaginatorModule, MatSortModule, MatFormFieldModule, MatTableModule,
  MatInputModule, MatSelectModule, MatOptionModule, MatIconModule,
  MatCardModule, MatButtonModule, MatDialogModule } from '@angular/material';
import { ProductComponent } from './product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryEditComponent } from '../category/category-edit/category-edit.component';

@NgModule({
  declarations: [
    ProductHomeComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ProductListComponent,
    ProductComponent,

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

    ProductRoutingModule,
  ],
  entryComponents: [
    CategoryEditComponent
  ]
})
export class ProductModule { }
