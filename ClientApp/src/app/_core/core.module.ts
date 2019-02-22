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

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
  ],
  providers: [
    AuthService,
    DialogService,
    ValidateService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
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
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule
    };
  }
}
