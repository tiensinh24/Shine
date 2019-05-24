import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StarRatingModule } from 'angular-star-rating';
import { NgxGalleryModule } from 'ngx-gallery';
import { AgePipe } from './_pipes/age.pipe';
import { CustomCurrencyPipe } from './_pipes/custom-currency.pipe';
import { GenderPipe } from './_pipes/gender.pipe';
import { ImportPipe } from './_pipes/import.pipe';

@NgModule({
  declarations: [GenderPipe, AgePipe, CustomCurrencyPipe, ImportPipe],
  imports: [
    CommonModule,

    // Forms
    FormsModule,
    ReactiveFormsModule,

    // Flex
    FlexLayoutModule,

    // Ngx-gallery
    NgxGalleryModule,

    // Star rating
    StarRatingModule.forRoot()
  ],
  exports: [
    // Pipe
    GenderPipe,
    AgePipe,
    CustomCurrencyPipe,
    ImportPipe,

    CommonModule,

    // Forms
    FormsModule,
    ReactiveFormsModule,

    // Flex
    FlexLayoutModule,

    // Ngx-gallery
    NgxGalleryModule,

    // Star rating
    StarRatingModule
  ]
})
export class SharedModule {}
