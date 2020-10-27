import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HomepageComponent } from './home/homepage/homepage.component';
import { TopRatedComponent } from './home/homepage/movie-type-navigator/top-rated/top-rated.component';
import { TypeAllComponent } from './home/homepage/movie-type-navigator/type-all/type-all.component';
import { TypeComingSoonComponent } from './home/homepage/movie-type-navigator/type-coming-soon/type-coming-soon.component';
import { TypeNowplayingComponent } from './home/homepage/movie-type-navigator/type-nowplaying/type-nowplaying.component';
import { MovieDetailsComponent } from './home/movie-details/movie-details.component';
import { LikedMoviesComponent } from './user-account/liked-movies/liked-movies.component';
import { ProfileDetailsComponent } from './user-account/profile-details/profile-details.component';
import { UserAccountGuard } from './user-account/shared/user-account-guard.service';
import { UserAccountComponent } from './user-account/user-account.component';

const routes: Routes = [
  { path: '', component: HomeComponent,
    children: [
      { path: '', component: HomepageComponent, data: { animation: 'Homepage' } , children: [
        { path: '', component: TypeAllComponent, data: { animation: 'TypeAll'} },
        { path: 'type/nowplaying', component: TypeNowplayingComponent, data: { animation: 'TypeNowPlaying'} },
        { path: 'type/comingsoon', component: TypeComingSoonComponent, data: { animation: 'TypeComingSoon'} },
        { path: 'type/toprated', component: TopRatedComponent, data: { animation: 'TypeTopRated' } }
      ]},
      { path: 'movies/:tmdbId', component: MovieDetailsComponent, data: { animation: 'MovieDetails'}},
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
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
