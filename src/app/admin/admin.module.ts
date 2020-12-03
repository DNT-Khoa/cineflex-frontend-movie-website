import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories.component';
import { NewsComponent } from './news/news.component';
import { MoviesComponent } from './movies/movies.component';
import { AdminsComponent } from './admins/admins.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComingSoonComponent } from './movies/coming-soon/coming-soon.component';
import { NowPlayingComponent } from './movies/now-playing/now-playing.component';
import { ShortenPipe } from './movies/shared/shorten.pipe';
import { EditorModule } from '@tinymce/tinymce-angular';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';



@NgModule({
  declarations: [
    AdminHomeComponent, 
    DashboardComponent, 
    CategoriesComponent, 
    NewsComponent, 
    MoviesComponent, 
    AdminsComponent, 
    ComingSoonComponent, 
    NowPlayingComponent,
    ShortenPipe,
    AdminProfileComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    EditorModule
  ]
})
export class AdminModule { }
