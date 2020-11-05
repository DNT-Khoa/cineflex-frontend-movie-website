import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { AdminsComponent } from './admins/admins.component';
import { CategoriesComponent } from './categories/categories.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ComingSoonComponent } from './movies/coming-soon/coming-soon.component';
import { MoviesComponent } from './movies/movies.component';
import { NowPlayingComponent } from './movies/now-playing/now-playing.component';
import { NewsComponent } from './news/news.component';

const routes: Routes = [
  { path: '', component: AdminHomeComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      { path: 'dashboard', component: DashboardComponent},
      { path: 'categories', component: CategoriesComponent},
      { path: 'movies', component: MoviesComponent, 
        children: [
          { path: 'comingsoon', component: ComingSoonComponent},
          { path: 'nowplaying', component: NowPlayingComponent}
        ]
      },
      { path: 'news', component: NewsComponent},
      { path: 'admins', component: AdminsComponent},
      { path: 'profile', component: AdminProfileComponent}
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
