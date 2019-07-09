import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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
