import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { GenderPipe } from '../_pipes/gender.pipe';

@NgModule({
  declarations: [GenderPipe],
  imports: [
    CommonModule,

    // Forms
    FormsModule,
    ReactiveFormsModule,

    // Flex
    FlexLayoutModule,
  ],
  exports: [
    // Pipe
    GenderPipe,

    CommonModule,

    // Forms
    FormsModule,
    ReactiveFormsModule,

    // Flex
    FlexLayoutModule,
  ]
})
export class SharedModule { }
