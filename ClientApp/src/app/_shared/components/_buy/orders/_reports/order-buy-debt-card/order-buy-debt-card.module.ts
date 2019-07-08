import { OrderBuyDebtCardComponent } from './order-buy-debt-card.component';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'src/app/_shared/shared.module';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [OrderBuyDebtCardComponent],
  imports: [
    // Shared module
    SharedModule,

    // Material
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  exports: [OrderBuyDebtCardComponent]
})
export class OrderBuyDebtCardModule {}
