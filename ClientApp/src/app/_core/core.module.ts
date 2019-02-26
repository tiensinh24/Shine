import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material';

import { AuthService } from '../auth/_services/auth.service';
import { DialogService } from '../_services/dialog.service';
import { ValidateService } from '../_services/validate.service';
import { AuthResponseInterceptor } from '../auth/_services/auth.response.interceptor';
import { AuthGuard } from '../auth/_guards/auth.guard';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
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
