import { NgModule } from '@angular/core';

import { PageNotFoundComponent } from './page-not-found.component';
import { SharedModule } from '../../shared.module';

@NgModule({
  imports: [SharedModule],
  exports: [PageNotFoundComponent],
  declarations: [PageNotFoundComponent]
})
export class PageNotFoundModule {}
