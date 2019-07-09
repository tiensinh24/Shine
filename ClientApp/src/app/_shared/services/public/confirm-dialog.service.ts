import { Injectable, NgModule } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogSharedModule } from '../../components/confirm-dialog/confirm-dialog-shared.module';

@NgModule({
  imports: [ConfirmDialogSharedModule]
})


@Injectable({
  providedIn: 'root',
})
export class ConfirmDialogService {
  constructor(private dialog: MatDialog) {}

  // confirm(message?: string): Observable<boolean> {
  //   const confirmation = window.confirm(message || 'Is it OK?');

  //   return of(confirmation);
  // }

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
