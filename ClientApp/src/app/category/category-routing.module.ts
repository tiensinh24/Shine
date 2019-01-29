import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './category.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';

const routes: Routes = [
  {
    path: '', component: CategoryComponent, pathMatch: 'full', children:
      [
        { path: '', redirectTo: '/category/home', pathMatch: 'full' },
        { path: 'home', component: CategoryComponent },
        { path: 'edit/:id', component: CategoryEditComponent }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
