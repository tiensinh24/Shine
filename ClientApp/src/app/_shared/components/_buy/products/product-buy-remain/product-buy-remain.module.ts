import { NgModule } from '@angular/core';
import { ProductBuyRemainComponent } from './product-buy-remain.component';
import { SharedModule } from 'src/app/_shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ProductBuyRemainComponent],
  imports: [
    // Share module
    SharedModule,

    // Material
    MatCardModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatTableModule,
    
    // Router
    RouterModule
  ],
  exports: [ProductBuyRemainComponent]
})
export class ProductBuyRemainModule { }
