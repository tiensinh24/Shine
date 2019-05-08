import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxGalleryModule } from 'ngx-gallery';
import { AgePipe } from './_pipes/age.pipe';
import { CustomCurrencyPipe } from './_pipes/custom-currency.pipe';
import { GenderPipe } from './_pipes/gender.pipe';


@NgModule({
  declarations: [GenderPipe, AgePipe, CustomCurrencyPipe],
  imports: [
    CommonModule,

    // Forms
    FormsModule,
    ReactiveFormsModule,

    // Flex
    FlexLayoutModule,

    // Ngx-gallery
    NgxGalleryModule
  ],
  exports: [
    // Pipe
    GenderPipe,
    AgePipe,
    CustomCurrencyPipe,

    CommonModule,

    // Forms
    FormsModule,
    ReactiveFormsModule,

    // Flex
    FlexLayoutModule,

    // Ngx-gallery
    NgxGalleryModule
  ]
})
export class SharedModule {}
