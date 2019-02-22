import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatPaginatorModule, MatSortModule, MatFormFieldModule, MatTableModule,
  MatInputModule, MatSelectModule, MatOptionModule, MatIconModule,
  MatCardModule, MatButtonModule,
  MatDialogModule, MatTooltipModule, MatGridListModule, MatSlideToggleModule, MatCheckboxModule, MatProgressBarModule, MatProgressSpinnerModule
} from '@angular/material';

import { ProductBuyRoutingModule } from './product-buy-routing.module';
import { ProductBuyComponent } from './product-buy.component';
import { ProductBuyHomeComponent } from './product-buy-home/product-buy-home.component';
import { ProductBuyDetailComponent } from './product-buy-detail/product-buy-detail.component';
import { ProductBuyEditComponent } from './product-buy-edit/product-buy-edit.component';
import { ProductBuyListComponent } from './product-buy-list/product-buy-list.component';

import { DialogModule } from 'src/app/_modules/dialog.module';
import { SharedModule } from 'src/app/_shared/shared.module';
import { CoreModule } from 'src/app/_core/core.module';

@NgModule({
  declarations: [
    ProductBuyComponent,
    ProductBuyHomeComponent,
    ProductBuyDetailComponent,
    ProductBuyEditComponent,
    ProductBuyListComponent,

  ],
  imports: [
    SharedModule,
    CoreModule,

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

    ProductBuyRoutingModule,
  ],
})
export class ProductBuyModule { }
