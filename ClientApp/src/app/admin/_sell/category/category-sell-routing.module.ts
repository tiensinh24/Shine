import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategorySellComponent } from './category-sell.component';
import { CategorySellHomeComponent } from './category-sell-home/category-sell-home.component';
import { CategorySellEditComponent } from './category-sell-edit/category-sell-edit.component';

const routes: Routes = [
  {
    path: '', component: CategorySellComponent, children:
      [
        { path: '', redirectTo: '/admin/category-sell/home', pathMatch: 'full' },
        { path: 'home', component: CategorySellHomeComponent },
        { path: 'create', component: CategorySellEditComponent },
        { path: ':categoryId', component: CategorySellEditComponent },
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategorySellRoutingModule { }
