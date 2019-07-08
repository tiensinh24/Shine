import { OrderBuyLatestComponent } from './order-buy-latest.component';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { StarRatingModule } from 'angular-star-rating';
import { SharedModule } from 'src/app/_shared/shared.module';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [OrderBuyLatestComponent],
  imports: [
    // Shared module
    SharedModule,

    // Material
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,

    // Star rating
    StarRatingModule
  ],
  exports: [OrderBuyLatestComponent]
})
export class OrderBuyLatestModule {}
