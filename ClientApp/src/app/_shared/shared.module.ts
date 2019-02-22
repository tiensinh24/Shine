import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableModule, MatFormFieldModule, MatInputModule, MatPaginatorModule,
  MatSortModule, MatToolbarModule, MatTooltipModule, MatButtonModule,
  MatSidenavModule, MatIconModule, MatListModule, MatCardModule,
  MatProgressSpinnerModule, MatDialogModule, MatMenuModule, MatExpansionModule,
  MatGridListModule, MatSnackBarModule, MatProgressBarModule } from '@angular/material';

import { CategoryBuyDialogComponent } from './components/category-buy-dialog/category-buy-dialog.component';

@NgModule({
  declarations: [
    CategoryBuyDialogComponent,
  ],
  entryComponents: [
    CategoryBuyDialogComponent,
  ],
  imports: [
    CommonModule,

    // Forms
    ReactiveFormsModule,

    // Material
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

    // Flex
    FlexLayoutModule,
  ],
  exports: [
    // Components
    CategoryBuyDialogComponent,

    CommonModule,

    // Forms
    ReactiveFormsModule,

    // Material
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

    // Flex
    FlexLayoutModule,
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule
    };
  }
}
