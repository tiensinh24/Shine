import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { GenderPipe } from './_pipes/gender.pipe';
import { AgePipe } from './_pipes/age.pipe';
import { NgxGalleryModule } from 'ngx-gallery';

@NgModule({
  declarations: [GenderPipe, AgePipe],
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
