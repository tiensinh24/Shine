import { Injectable, NgModule } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogModule } from '../../components/confirm-dialog/confirm-dialog.module';

@NgModule({
  imports: [ConfirmDialogModule]
})


@Injectable({
  providedIn: 'root',
})
export class ConfirmDialogService {
  constructor(private dialog: MatDialog) {}

  openDialog(msg: string) {
    return this.dialog.open(ConfirmDialogComponent, {
      width: '390px',
      minHeight: '100px',
      position: { top: '10px' },
      disableClose: true,
      data: {
        message: msg
      }
    });
  }
}
