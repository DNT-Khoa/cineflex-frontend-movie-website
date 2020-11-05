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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MovieTypeNavigatorComponent } from './home/homepage/movie-type-navigator/movie-type-navigator.component';
import { TypeAllComponent } from './home/homepage/movie-type-navigator/type-all/type-all.component';
import { TypeComingSoonComponent } from './home/homepage/movie-type-navigator/type-coming-soon/type-coming-soon.component';
import { TopRatedComponent } from './home/homepage/movie-type-navigator/top-rated/top-rated.component';
import { TypeNowplayingComponent } from './home/homepage/movie-type-navigator/type-nowplaying/type-nowplaying.component';
import { TooltipModule } from '../tooltip-pro-ng7';
import { RecommendationsComponent } from './home/recommendations/recommendations.component';
import { IvyCarouselModule } from '../ivyсarousel_pro/carousel.module';
import { CategoryCommaSeparatorTMDBMoviePipe } from './shared/categoryCommaSeparatorTMDBMovie.pipe';
import { NewsDetailsComponent } from './home/news/news-details/news-details.component';
import { NewsComponent } from './home/news/news.component';
import { NewsUtilitiesComponent } from './home/news/news-utilities/news-utilities.component';
import { AllNewsComponent } from './home/news/all-news/all-news.component';
import { ShortenPipe } from './shared/shorten.pipe';
import { NewsCategoryComponent } from './home/news/news-category/news-category.component';
import { CategoryNavigatorComponent } from './home/news/news-utilities/category-navigator/category-navigator.component';
import { TopNewsComponent } from './home/news/news-utilities/top-news/top-news.component';
import { AdminCredentialsComponent } from './home/admin-credentials/admin-credentials.component';
import { ResetPasswordComponent } from './home/reset-password/reset-password.component';


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
    RecommendationsComponent,
    CategoryCommaSeparatorTMDBMoviePipe,
    NewsDetailsComponent,
    NewsComponent,
    NewsUtilitiesComponent,
    AllNewsComponent,
    ShortenPipe,
    NewsCategoryComponent,
    CategoryNavigatorComponent,
    TopNewsComponent,
    AdminCredentialsComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    TooltipModule,
    IvyCarouselModule,
    FormsModule
  ]
})
export class HomeModule { }
