import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatDialogModule } from '@angular/material';

import { CategoryRoutingModule } from './category-buy-routing.module';
import { CategoryBuyComponent } from './category-buy.component';
import { CategoryBuyHomeComponent } from './category-buy-home/category-buy-home.component';
import { CategoryBuyEditComponent } from './category-buy-edit/category-buy-edit.component';

@NgModule({
  declarations: [
    CategoryBuyComponent,
    CategoryBuyHomeComponent,
    CategoryBuyEditComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    CategoryRoutingModule,
  ],
})
export class CategoryBuyModule {}
