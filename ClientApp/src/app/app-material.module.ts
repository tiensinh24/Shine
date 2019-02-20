import { NgModule } from '@angular/core';
import {
  MatTableModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule,
  MatPaginatorModule, MatSortModule, MatToolbarModule, MatButtonModule,
  MatSidenavModule, MatIconModule, MatListModule, MatCardModule,
  MatDialogModule, MatExpansionModule, MatTooltipModule, MatMenuModule, MatGridListModule, MatSnackBarModule, MatProgressBarModule,
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatToolbarModule,
    MatTooltipModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatMenuModule,
    MatExpansionModule,
    MatGridListModule,
    MatSnackBarModule,
    MatProgressBarModule,

  ],
  exports: [
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatToolbarModule,
    MatTooltipModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatMenuModule,
    MatExpansionModule,
    MatGridListModule,
    MatSnackBarModule,
    MatProgressBarModule,

  ]
})
export class AppMaterialModule { }
