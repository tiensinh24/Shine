import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryComponent } from './category.component';

@NgModule({
  declarations: [CategoryEditComponent, CategoryComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CategoryRoutingModule
  ]
})
export class CategoryModule { }
