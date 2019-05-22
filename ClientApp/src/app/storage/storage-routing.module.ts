import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StorageComponent } from './storage.component';
import { StorageListComponent } from './storage-list/storage-list.component';
import { StorageDetailComponent } from './storage-detail/storage-detail.component';

const routes: Routes = [
  {
    path: '',
    component: StorageComponent,
    children: [
      { path: '', redirectTo: '/storage/home', pathMatch: 'full' },
      { path: 'home', component: StorageListComponent },
      { path: ':storageId', component: StorageDetailComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StorageRoutingModule {}
