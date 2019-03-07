import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MAT_DATE_LOCALE, } from '@angular/material';

import { AuthService } from '../auth/_services/auth.service';
import { DialogService } from '../_services/dialog.service';
import { ValidateService } from '../_services/validate.service';
import { AuthResponseInterceptor } from '../auth/_services/auth.response.interceptor';
import { AuthGuard } from '../auth/_guards/auth.guard';
import { ProductBuyService } from '../product/buy/_services/product-buy.service';
import { CategoryBuyService } from '../category/buy/_services/category-buy.service';
import { SupplierService } from '../supplier/_services/supplier.service';
import { OrderBuyService } from '../order/buy/_services/order-buy.service';
import { CountryService } from '../country/_services/country.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
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

        AuthService,
        AuthGuard,
        DialogService,
        ValidateService,
        { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
        { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthResponseInterceptor,
          multi: true,
        },
        {
          provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
          useValue: {
            horizontalPosition: 'end',
            duration: 2500,
          },
        },
      ],
    };
  }
}
