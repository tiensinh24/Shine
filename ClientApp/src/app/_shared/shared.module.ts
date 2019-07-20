import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StarRatingModule } from 'angular-star-rating';
import { NgxGalleryModule } from 'ngx-gallery';
import { MatAutocompleteTriggerEnforceSelectionDirective } from './directives/mat-autocomplete-trigger-enforce-selection.directive';
import { AgePipe } from './pipes/age.pipe';
import { CustomCurrencyPipe } from './pipes/custom-currency.pipe';
import { GenderPipe } from './pipes/gender.pipe';
import { ImportPipe } from './pipes/import.pipe';
import { MonthPipe } from './pipes/month.pipe';
import { DisableControlDirective } from './directives/disable-control.directive';

@NgModule({
  declarations: [
    GenderPipe,
    AgePipe,
    CustomCurrencyPipe,
    ImportPipe,
    MonthPipe,
    MatAutocompleteTriggerEnforceSelectionDirective,
    DisableControlDirective
  ],
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
    MatAutocompleteTriggerEnforceSelectionDirective,
    DisableControlDirective,

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
