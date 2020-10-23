import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HomepageComponent } from './home/homepage/homepage.component';
import { MovieDetailsComponent } from './home/movie-details/movie-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent, 
    children: [
      { path: '', component: HomepageComponent, pathMatch: 'full'},
      { path: 'movies/:tmdbId', component: MovieDetailsComponent}
    ],
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
