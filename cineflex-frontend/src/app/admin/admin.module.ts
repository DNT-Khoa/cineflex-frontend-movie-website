import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories.component';
import { NewsComponent } from './news/news.component';
import { MoviesComponent } from './movies/movies.component';
import { AdminsComponent } from './admins/admins.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AdminHomeComponent, DashboardComponent, CategoriesComponent, NewsComponent, MoviesComponent, AdminsComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
