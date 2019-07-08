import { OrderBuyTopComponent } from './order-buy-top.component';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'src/app/_shared/shared.module';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [OrderBuyTopComponent],
  imports: [
    // Shared module
    SharedModule,

    // Material module
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
    MatTooltipModule
  ],
  exports: [OrderBuyTopComponent]
})
export class OrderBuyTopModule {}
