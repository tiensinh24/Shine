import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { MAT_DATE_LOCALE, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { AuthGuard } from 'src/app/auth/_guards/auth.guard';
import { AuthResponseInterceptor } from 'src/app/auth/_services/auth.response.interceptor';
import { AuthService } from 'src/app/auth/_services/auth.service';
import { CategoryBuyService } from 'src/app/category/buy/_services/category-buy.service';
import { CountryService } from 'src/app/country/_services/country.service';
import { OrderBuyService } from 'src/app/order/buy/_services/order-buy.service';
import { PhotoService } from 'src/app/photo/_services/photo.service';
import { ProductBuyService } from 'src/app/product/buy/_services/product-buy.service';
import { SupplierService } from 'src/app/supplier/_services/supplier.service';
import { ConfirmDialogService } from '../_services/confirm-dialog.service';
import { ValidateService } from '../_services/validate.service';
import { StorageService } from 'src/app/storage/_services/storage.service';


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
        StorageService,

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
