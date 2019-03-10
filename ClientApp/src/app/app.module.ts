import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LogInComponent } from './log-in/log-in.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './_shared/shared.module';
import { MaterialSharedModule } from './_shared/material-shared.module';
import { CoreModule } from './_shared/_core/core.module';
import { ConfirmDialogComponent } from './_shared/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogSharedModule } from './_shared/components/confirm-dialog/confirm-dialog-shared.module';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    PageNotFoundComponent,
    LogInComponent,
  ],
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

    AppRoutingModule,
  ],
  exports: [
    ],
  providers: [

  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
