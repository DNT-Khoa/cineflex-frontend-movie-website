import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminsComponent } from './admins/admins.component';
import { CategoriesComponent } from './categories/categories.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MoviesComponent } from './movies/movies.component';
import { NewsComponent } from './news/news.component';

const routes: Routes = [
  { path: '', component: AdminHomeComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      { path: 'dashboard', component: DashboardComponent},
      { path: 'categories', component: CategoriesComponent},
      { path: 'movies', component: MoviesComponent},
      { path: 'news', component: NewsComponent},
      { path: 'admins', component: AdminsComponent}
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
