import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MAT_DATE_LOCALE } from '@angular/material';

import { CategoryBuyService } from 'src/app/category/buy/_services/category-buy.service';
import { ProductBuyService } from 'src/app/product/buy/_services/product-buy.service';
import { CountryService } from 'src/app/country/_services/country.service';
import { SupplierService } from 'src/app/supplier/_services/supplier.service';
import { OrderBuyService } from 'src/app/order/buy/_services/order-buy.service';
import { AuthService } from 'src/app/auth/_services/auth.service';
import { AuthGuard } from 'src/app/auth/_guards/auth.guard';
import { ConfirmDialogService } from '../_services/confirm-dialog.service';
import { ValidateService } from '../_services/validate.service';
import { AuthResponseInterceptor } from 'src/app/auth/_services/auth.response.interceptor';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { PhotoService } from 'src/app/photo/_services/photo.service';

@NgModule({
  declarations: [],
  imports: [CommonModule]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        // Core services
        CategoryBuyService,
        ProductBuyService,
        CountryService,
        SupplierService,
        OrderBuyService,
        PhotoService,

        AuthService,
        AuthGuard,
        ConfirmDialogService,
        ValidateService,
        { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
        { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthResponseInterceptor,
          multi: true
        },
        {
          provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
          useValue: {
            horizontalPosition: 'end',
            duration: 2500
          }
        }
      ]
    };
  }
}
