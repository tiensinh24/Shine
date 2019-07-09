import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryBuyComponent } from './category-buy.component';
import { CategoryBuyHomeComponent } from './category-buy-home/category-buy-home.component';
import { CategoryBuyEditComponent } from './category-buy-edit/category-buy-edit.component';
import { CategoryBuyDetailComponent } from './category-buy-detail/category-buy-detail.component';


const routes: Routes = [
  {
    path: '', component: CategoryBuyComponent, children:
      [
        { path: '', redirectTo: '/admin/category-buy/home', pathMatch: 'full' },
        { path: 'home', component: CategoryBuyHomeComponent },
        { path: 'create', component: CategoryBuyEditComponent },
        { path: 'edit/:categoryId', component: CategoryBuyEditComponent },
        { path: ':categoryId', component: CategoryBuyDetailComponent },
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
