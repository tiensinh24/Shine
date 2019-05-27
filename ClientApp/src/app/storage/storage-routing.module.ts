import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StorageAddImportComponent } from './storage-add-import/storage-add-import.component';
import { StorageDetailComponent } from './storage-detail/storage-detail.component';
import { StorageListComponent } from './storage-list/storage-list.component';
import { StorageProductsListComponent } from './storage-products-list/storage-products-list.component';
import { StorageComponent } from './storage.component';

const routes: Routes = [
  {
    path: '',
    component: StorageComponent,
    children: [
      { path: '', redirectTo: '/storage/home', pathMatch: 'full' },
      { path: 'home', component: StorageListComponent },
      { path: ':storageId', component: StorageDetailComponent },
      { path: ':storageId/storage-products', component: StorageProductsListComponent },
      { path: ':storageId/add-import', component: StorageAddImportComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StorageRoutingModule {}
