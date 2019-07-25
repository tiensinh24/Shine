import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './_shared/core/core.module';
import { ConfirmDialogSharedModule } from './_shared/components/confirm-dialog/confirm-dialog-shared.module';
import { MaterialSharedModule } from './_shared/material-shared.module';
import { SharedModule } from './_shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogInComponent } from './_shared/components/log-in/log-in.component';
import { PageNotFoundComponent } from './_shared/components/page-not-found/page-not-found.component';

import { HomeComponent } from './main/home/home.component';

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent, LogInComponent, HomeComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    HttpClientModule,

    // rwa modules
    SharedModule,
    CoreModule.forRoot(),

    // Material
    MaterialSharedModule,

    // Dialog
    ConfirmDialogSharedModule,

    AppRoutingModule
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
