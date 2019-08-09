import { NgModule } from '@angular/core';

import { EmployeeHomeComponent } from './employee-home/employee-home.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeeComponent } from './employee.component';
import { EmployeeListHomeComponent } from './employee-list/employee-list-home.component';
import { EmployeeListComponent } from './employee-list/employee-list/employee-list.component';
import { EmployeeCardComponent } from './employee-list/employee-card/employee-card.component';
import { NgxGalleryModule } from 'ngx-gallery';
import { PersonPhotoGalleryModule } from 'src/app/_shared/components/person-photo-gallery/person-photo-gallery.module';
import { SharedModule } from 'src/app/_shared/shared.module';
import { MaterialSharedModule } from 'src/app/_shared/material-shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { PhotoUploadModule } from 'src/app/_shared/components/photo-upload/photo-upload.module';
import { EmployeeRoutingModule } from './employee-routing.module';
import { DepartmentEditDialogModule } from 'src/app/_shared/components/department-edit-dialog/department-edit-dialog.module';

@NgModule({
  declarations: [
    EmployeeHomeComponent,
    EmployeeDetailComponent,
    EmployeeEditComponent,
    EmployeeListHomeComponent,
    EmployeeListComponent,
    EmployeeCardComponent,
    EmployeeComponent
  ],
  imports: [
    // Shared module
    SharedModule,

    // Material
    MaterialSharedModule,

    MatTabsModule,

    // Dialog
    DepartmentEditDialogModule,

    // Photo upload
    PhotoUploadModule,

    // Photo gallery
    PersonPhotoGalleryModule,

    // Ngx-Gallery
    NgxGalleryModule,

    // Routing
    EmployeeRoutingModule,
  ]
})
export class EmployeeModule {}
