import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  MatExpansionModule,
} from '@angular/material';

import { CategorySellRoutingModule } from './category-sell-routing.module';
import { CategorySellComponent } from './category-sell.component';
import { CategorySellHomeComponent } from './category-sell-home/category-sell-home.component';
import { CategorySellEditComponent } from './category-sell-edit/category-sell-edit.component';

@NgModule({
  declarations: [
    CategorySellComponent,
    CategorySellHomeComponent,
    CategorySellEditComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatExpansionModule,
    CategorySellRoutingModule,
  ],
})
export class CategorySellModule {}
