import { OrderBuyLatestComponent } from './order-buy-latest.component';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { StarRatingModule } from 'angular-star-rating';
import { SharedModule } from 'src/app/_shared/shared.module';

@NgModule({
  declarations: [OrderBuyLatestComponent],
  imports: [
    // Shared module
    SharedModule,

    // Material
    MatCardModule,
    MatButtonModule,
    MatIconModule,

    // Star rating
    StarRatingModule
  ],
  exports: [OrderBuyLatestComponent]
})
export class OrderBuyLatestModule {}
