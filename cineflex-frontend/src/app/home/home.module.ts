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
    VideoSlicePipe
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
  ]
})
export class HomeModule { }
