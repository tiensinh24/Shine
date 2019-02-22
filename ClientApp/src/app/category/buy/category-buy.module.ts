import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
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
import { FlexLayoutModule } from '@angular/flex-layout';

import { CategoryRoutingModule } from './category-buy-routing.module';
import { CategoryBuyComponent } from './category-buy.component';
import { CategoryBuyHomeComponent } from './category-buy-home/category-buy-home.component';
import { CategoryBuyEditComponent } from './category-buy-edit/category-buy-edit.component';
import { CategoryBuyListComponent } from './category-buy-list/category-buy-list.component';

import { CategoryBuyDetailComponent } from './category-buy-detail/category-buy-detail.component';
import { SharedModule } from 'src/app/_shared/shared.module';
import { CoreModule } from 'src/app/_core/core.module';

@NgModule({
  declarations: [
    CategoryBuyComponent,
    CategoryBuyHomeComponent,
    CategoryBuyEditComponent,
    CategoryBuyListComponent,
    CategoryBuyDetailComponent,

  ],
  imports: [
    SharedModule,
    CoreModule,

    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,

    // Material
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

    // Routing
    CategoryRoutingModule,
  ],
})
export class CategoryBuyModule { }
