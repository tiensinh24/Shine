import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryComponent } from './category.component';
import { CategoryHomeComponent } from './category-home/category-home.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { MatFormFieldModule, MatInputModule } from '@angular/material';

@NgModule({
  declarations: [CategoryEditComponent, CategoryComponent, CategoryHomeComponent, CategoryListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CategoryRoutingModule
  ]
})
export class CategoryModule { }
