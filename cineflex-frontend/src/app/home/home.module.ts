import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ShowcaseComponent } from './home/homepage/showcase/showcase.component';
import { HomepageComponent } from './home/homepage/homepage.component';
import { MovieDetailsComponent } from './home/movie-details/movie-details.component';
import { DirectorCommaSeparatorPipe } from './shared/directorCommaSeparator.pipe'
import { CategoryCommaSeparatorPipe } from './shared/categoryCommaSeparator.pipe';
import { CountryCommaSeparatorPipe } from './shared/countryCommaSeparator.pipe';
import { ActorCommaSeparatorPipe } from './shared/actorCommaSeparator.pipe';
import { LanguageCommaSeparatorPipe } from './shared/languageCommaSeparator.pipe';
import { VideoSlicePipe } from './shared/videoSlice.pipe';
import { UserAccountComponent } from './user-account/user-account.component';
import { ProfileDetailsComponent } from './user-account/profile-details/profile-details.component';
import { LikedMoviesComponent } from './user-account/liked-movies/liked-movies.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MovieTypeNavigatorComponent } from './home/homepage/movie-type-navigator/movie-type-navigator.component';
import { TypeAllComponent } from './home/homepage/movie-type-navigator/type-all/type-all.component';
import { TypeComingSoonComponent } from './home/homepage/movie-type-navigator/type-coming-soon/type-coming-soon.component';
import { TopRatedComponent } from './home/homepage/movie-type-navigator/top-rated/top-rated.component';
import { TypeNowplayingComponent } from './home/homepage/movie-type-navigator/type-nowplaying/type-nowplaying.component';
import { TooltipModule } from '../tooltip-pro-ng7';




@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    ShowcaseComponent,
    HomepageComponent,
    MovieDetailsComponent,
    DirectorCommaSeparatorPipe,
    CategoryCommaSeparatorPipe,
    CountryCommaSeparatorPipe,
    ActorCommaSeparatorPipe,
    LanguageCommaSeparatorPipe,
    VideoSlicePipe,
    UserAccountComponent,
    ProfileDetailsComponent,
    LikedMoviesComponent,
    MovieTypeNavigatorComponent,
    TypeAllComponent,
    TypeComingSoonComponent,
    TopRatedComponent,
    TypeNowplayingComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    TooltipModule
  ]
})
export class HomeModule { }
