import { OrderBuyDetailCardComponent } from './order-buy-detail-card.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { GoogleChartsModule } from 'angular-google-charts';
import { SharedModule } from 'src/app/_shared/shared.module';

@NgModule({
  declarations: [OrderBuyDetailCardComponent],
  imports: [
    // Shared module
    SharedModule,

    // Material
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatTooltipModule,

    // Google charts
    GoogleChartsModule
  ],
  exports: [OrderBuyDetailCardComponent]
})
export class OrderBuyDetailCardModule {}
