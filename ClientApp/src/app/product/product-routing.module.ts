import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductHomeComponent } from './product-home/product-home.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
  {
    path: '', component: ProductHomeComponent, children:
      [
        { path: '', redirectTo: '/product/home', pathMatch: 'full' },
        { path: 'home', component: ProductHomeComponent },
        { path: 'detail', component: ProductDetailComponent },
        { path: 'edit', component: ProductEditComponent },
        { path: 'list', component: ProductListComponent }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
