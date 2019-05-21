import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StarRatingModule } from 'angular-star-rating';
import { CoreModule } from './_shared/_core/core.module';
import { ConfirmDialogSharedModule } from './_shared/components/confirm-dialog/confirm-dialog-shared.module';
import { MaterialSharedModule } from './_shared/material-shared.module';
import { SharedModule } from './_shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LogInComponent } from './log-in/log-in.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [AppComponent, NavMenuComponent, HomeComponent, PageNotFoundComponent, LogInComponent],
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
