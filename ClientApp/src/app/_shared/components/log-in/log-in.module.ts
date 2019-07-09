import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { MaterialSharedModule } from '../../material-shared.module';
import { LogInComponent } from './log-in.component';

@NgModule({
  declarations: [LogInComponent],
  imports: [SharedModule, MaterialSharedModule],
  exports: [LogInComponent],
  
})
export class LoginModule {}
