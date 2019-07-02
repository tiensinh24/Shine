import { OrderBuyDetailCardComponent } from './order-buy-detail-card.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from 'src/app/_shared/shared.module';

@NgModule({
  declarations: [OrderBuyDetailCardComponent],
  imports: [
    // Shared module
    SharedModule,

    // Material
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatDividerModule,
  ],
  exports: [
    OrderBuyDetailCardComponent
  ]
})
export class OrderBuyDetailCardModule { }
