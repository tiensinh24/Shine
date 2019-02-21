import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  MatExpansionModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule,
  MatSelectModule,
  MatOptionModule,
  MatIconModule, MatCardModule,
  MatButtonModule,
  MatTooltipModule,
  MatGridListModule,
  MatSlideToggleModule,
  MatCheckboxModule,
  MatProgressBarModule,
  MatProgressSpinnerModule
} from '@angular/material';

import { CategoryRoutingModule } from './category-buy-routing.module';
import { CategoryBuyComponent } from './category-buy.component';
import { CategoryBuyHomeComponent } from './category-buy-home/category-buy-home.component';
import { CategoryBuyEditComponent } from './category-buy-edit/category-buy-edit.component';
import { CategoryBuyListComponent } from './category-buy-list/category-buy-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CategoryBuyDetailComponent } from './category-buy-detail/category-buy-detail.component';
import { CategoryBuyDialogComponent } from './_dialogs/category-buy-dialog/category-buy-dialog.component';
import { DialogModule } from 'src/app/_modules/dialog.module';
import { AppMaterialModule } from 'src/app/app-material.module';

@NgModule({
  declarations: [
    CategoryBuyComponent,
    CategoryBuyHomeComponent,
    CategoryBuyEditComponent,
    CategoryBuyListComponent,
    CategoryBuyDetailComponent,
    CategoryBuyDialogComponent,
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
    MatCheckboxModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    CategoryRoutingModule,
  ],
  entryComponents: [
    CategoryBuyDialogComponent,
  ]
})
export class CategoryBuyModule { }
