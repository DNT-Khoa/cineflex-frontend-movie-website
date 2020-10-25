import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HomepageComponent } from './home/homepage/homepage.component';
import { MovieDetailsComponent } from './home/movie-details/movie-details.component';
import { LikedMoviesComponent } from './user-account/liked-movies/liked-movies.component';
import { ProfileDetailsComponent } from './user-account/profile-details/profile-details.component';
import { UserAccountGuard } from './user-account/shared/user-account-guard.service';
import { UserAccountComponent } from './user-account/user-account.component';

const routes: Routes = [
  { path: '', component: HomeComponent, 
    children: [
      { path: '', component: HomepageComponent, pathMatch: 'full'},
      { path: 'movies/:tmdbId', component: MovieDetailsComponent},
      { path: 'user/account', component: UserAccountComponent, canActivate: [UserAccountGuard], children: [
        { path: '', redirectTo: 'profile-details'},
        { path: 'profile-details', component: ProfileDetailsComponent},
        { path: 'liked-movies', component: LikedMoviesComponent}
      ]}
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
