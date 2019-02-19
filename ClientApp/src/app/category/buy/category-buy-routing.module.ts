import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryBuyComponent } from './category-buy.component';
import { CategoryBuyHomeComponent } from './category-buy-home/category-buy-home.component';
import { CategoryBuyEditComponent } from './category-buy-edit/category-buy-edit.component';


const routes: Routes = [
  {
    path: '', component: CategoryBuyComponent, children:
      [
        { path: '', redirectTo: '/category-buy/home', pathMatch: 'full' },
        { path: 'home', component: CategoryBuyHomeComponent },
        { path: 'create', component: CategoryBuyEditComponent },
        { path: ':categoryId', component: CategoryBuyEditComponent },
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
