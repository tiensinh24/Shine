import { NgModule } from '@angular/core';
import { CostEditDialogComponent } from './cost-edit-dialog.component';
import { SharedModule } from '../../shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MaterialSharedModule } from '../../material-shared.module';

@NgModule({
  declarations: [CostEditDialogComponent],
  imports: [
    SharedModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatRadioModule,
    
  ],
  exports: [CostEditDialogComponent],
  entryComponents: [CostEditDialogComponent]
})
export class CostEditDialogModule {}
