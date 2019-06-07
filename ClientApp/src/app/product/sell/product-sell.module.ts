import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ProductSellRoutingModule } from './product-sell-routing.module';
import { ProductSellComponent } from './product-sell.component';
import { ProductSellHomeComponent } from './product-sell-home/product-sell-home.component';
import { ProductSellDetailComponent } from './product-sell-detail/product-sell-detail.component';
import { ProductSellEditComponent } from './product-sell-edit/product-sell-edit.component';
import { ProductSellListComponent } from './product-sell-list/product-sell-list.component';
import { CategorySellDialogComponent } from 'src/app/category/sell/_dialogs/category-sell-dialog/category-sell-dialog.component';



@NgModule({
  declarations: [
    ProductSellComponent,
    ProductSellHomeComponent,
    ProductSellDetailComponent,
    ProductSellEditComponent,
    ProductSellListComponent,
    CategorySellDialogComponent,
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
    MatProgressSpinnerModule,
    MatProgressBarModule,
    ProductSellRoutingModule,
  ],
  entryComponents: [
    CategorySellDialogComponent
  ]
})
export class ProductSellModule {}
