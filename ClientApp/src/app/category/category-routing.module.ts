import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './category.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { CategoryHomeComponent } from './category-home/category-home.component';
import { CategoryListComponent } from './category-list/category-list.component';

const routes: Routes = [
  {
    path: '', component: CategoryComponent, children:
      [
        { path: '', redirectTo: '/category/home', pathMatch: 'full' },
        { path: 'home', component: CategoryHomeComponent },
        { path: 'create', component: CategoryEditComponent },
        { path: 'edit/:id', component: CategoryEditComponent },
        { path: 'list', component: CategoryListComponent }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
