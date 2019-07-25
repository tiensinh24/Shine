import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentEditDialogComponent } from './department-edit-dialog.component';
import { SharedModule } from '../../shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [DepartmentEditDialogComponent],
  entryComponents: [DepartmentEditDialogComponent],
  exports: [DepartmentEditDialogComponent],
  imports: [
    SharedModule,

    // Material
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class DepartmentEditDialogModule {}
