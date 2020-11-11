import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { ToastrModule} from 'ngx-toastr';
import { TokenInterceptor } from './auth/token-interceptor';
import { NavigationEnd, Router, RouteReuseStrategy, Scroll } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { filter, map, pairwise, tap, withLatestFrom } from 'rxjs/operators';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    ToastrModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(router: Router, viewportScroller: ViewportScroller) {
    AppModule.scrollTopTopOnNonMovieTypeNavigation(router, viewportScroller);
  }

  // Custom Naviation Scroller
  // Reference article:
  // https://medium.com/@jtcrowson/building-a-custom-angular-router-navigation-scroller-9f2bd6637baf
  // https://angular.io/api/router/ExtraOptions#scrollPositionRestoration
  static scrollTopTopOnNonMovieTypeNavigation(router: Router, viewportScroller: ViewportScroller): void {
    const scrollEvents = router.events.pipe(
      filter(event => event instanceof Scroll),
      map(event => event as Scroll)
    );

    // Emits the previous and current URL after the router finish navigating to a new URL
    const originUrl = router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(event => event as NavigationEnd),
      pairwise(),
      map(navigationEvents => [navigationEvents[0].url, navigationEvents[1].url]),
    );
    
    scrollEvents.pipe(withLatestFrom(originUrl)).subscribe(
      ([scrollEvent, urlPairs]) => {
        if (scrollEvent.position) {
          // backward navigation
          viewportScroller.scrollToPosition(scrollEvent.position);
        } else if (scrollEvent.anchor) {
          // anchor navigation
          viewportScroller.scrollToAnchor(scrollEvent.anchor);
        } else if (!((urlPairs[0].includes('/type/') || urlPairs[1].includes('/type/')) && !(urlPairs[1].includes('/movies/') || urlPairs[1].includes('/account/')))) {
          // forward navigation from non-movie-type-navigator
          viewportScroller.scrollToPosition([0, 0]);
        }
      }
    );

  }
}
