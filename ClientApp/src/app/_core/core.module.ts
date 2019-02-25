import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/_services/auth.service';
import { DialogService } from '../_services/dialog.service';
import { ValidateService } from '../_services/validate.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../auth/_services/auth.interceptor';
import { AuthResponseInterceptor } from '../auth/_services/auth.response.interceptor';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material';
import { SharedModule } from '../_shared/shared.module';
import { AuthGuard } from '../auth/_guards/auth.guard';
import { CategoryBuyService } from '../category/buy/_services/category-buy.service';
import { CategorySellService } from '../category/sell/_services/category-sell.service';
import { ProductBuyService } from '../product/buy/_services/product-buy.service';
import { ProductSellService } from '../product/sell/_services/product-sell.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
  ],
  providers: [

  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        AuthService,
        AuthGuard,
        DialogService,
        ValidateService,
        CategoryBuyService,
        CategorySellService,
        ProductBuyService,
        ProductSellService,
        // {
        //   provide: HTTP_INTERCEPTORS,
        //   useClass: AuthInterceptor,
        //   multi: true,
        // },
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
      ]
    };
  }
}
