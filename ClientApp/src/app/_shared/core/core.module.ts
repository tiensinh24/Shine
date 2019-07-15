import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MAT_AUTOCOMPLETE_DEFAULT_OPTIONS } from '@angular/material/autocomplete';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { AuthGuard } from 'src/app/auth/_guards/auth.guard';
import { AuthResponseInterceptor } from 'src/app/auth/_services/auth.response.interceptor';
import { AuthService } from 'src/app/auth/_services/auth.service';
import { OrderBuyService } from 'src/app/_shared/services/buy/order-buy.service';
import { PhotoService } from 'src/app/_shared/services/public/photo.service';
import { ProductService } from 'src/app/_shared/services/public/product.service';
import { ProductBuyService } from 'src/app/_shared/services/buy/product-buy.service';
import { StorageService } from 'src/app/_shared/services/public/storage.service';
import { SupplierService } from 'src/app/_shared/services/buy/supplier.service';
import { CategoryBuyService } from '../services/buy/category-buy.service';
import { CountryService } from '../services/public/country.service';
import { EmployeeService } from '../services/public/employee.service';
import { ConfirmDialogService } from '../services/public/confirm-dialog.service';
import { ValidateService } from '../services/public/validate.service';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

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
        ProductService,
        CountryService,
        SupplierService,
        OrderBuyService,
        PhotoService,
        StorageService,
        EmployeeService,

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
        },
        {
          provide: MAT_AUTOCOMPLETE_DEFAULT_OPTIONS,
          useValue: { autoActiveFirstOption: true }
        },
        {
          provide: STEPPER_GLOBAL_OPTIONS,
          useValue: { showError: true }
        }
      ]
    };
  }
}
