import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { pipe, Subscription } from 'rxjs';
import { filter, last, shareReplay, take, takeLast } from 'rxjs/operators';
import { MovieModal } from 'src/app/admin/movies/shared/movie.modal';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { MovieService } from '../../shared/movie.service';
import { TMDBMovieDetailsModal } from '../../shared/tmdbMovieDetails.modal';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
  animations: [
    trigger(
      'backgroundOverlayAnimation', 
      [
        transition(
          ':enter', 
          [
            style({ opacity: 0 }),
            animate('.5s ease-out', 
                    style({ opacity: 0.5 }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({ opacity: 0.5 }),
            animate('.5s ease-out', 
                    style({ opacity: 0 }))
          ]
        )
      ]
    ),
    trigger(
      'popupAnimation', 
      [
        transition(
          ':enter', 
          [
            style({ opacity: 0 }),
            animate('.5s ease-out', 
                    style({ opacity: 1 }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({ opacity: 1 }),
            animate('.5s ease-out', 
                    style({ opacity: 0 }))
          ]
        )
      ]
    ),
  ]
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  currentStarValue = 0;
  haveUserRatedMovie = false;
  ratedValue = 0;

  isMovieAvailable = true;

  isTooltipOpen = false;
  isUserLoggedIn = false;
  haveUserLikedMovie = false;
  isVideoOpen = false;
  isImageOpen = false;
  isMoviePlayerOpen = false;
  movie: MovieModal;
  tmdbMovieDetails: TMDBMovieDetailsModal;
  tmdbId: number;
  selectedVideo: any;
  selectedImage: any;
  movieLink: any;
  userLoggedInSubscription: Subscription;

  constructor(private movieService: MovieService, private activedRoute: ActivatedRoute, private toastr: ToastrService, private sanitizer: DomSanitizer, private authService: AuthService, private router: Router) { 
    // In case user navigates back or forth a navigation link on the same route, we want to reload component on that case
    router.events.pipe(
      filter((e): e is NavigationStart => e instanceof NavigationStart && e.navigationTrigger === 'popstate'),
      take(1)
    ).subscribe((event) => {
        this.router.navigateByUrl('/auth', {skipLocationChange: true}).then(()=>
          this.router.navigateByUrl(event.url));
      });
  }

  ngOnInit(): void {
    // Check first to see if the user has logged in
    this.isUserLoggedIn = this.authService.isUserLoggedIn();

    // Subscribe to be notified in case user logs out in the future
    this.userLoggedInSubscription = this.authService.loggedInSubject.subscribe(
      (result) => {
        this.isUserLoggedIn = result;
      }
    )

    

    // Get TMDB ID from the url route
    this.tmdbId = +this.activedRoute.snapshot.params['tmdbId'];

    

    // Check if movie exits in database
    this.movieService.checkIfMovieIsInDatabse(this.tmdbId).subscribe(result => {
      this.isMovieAvailable = result;

      // Only get movie from database when it exits
      if (this.isMovieAvailable) {
        this.getMovieFromDatabase();
      }
    }, error => {
      console.log(error);
      this.toastr.error("Something wrong happened with the server. Please try again later");
    });

    // Get Movie Details from tmdbID
    this.getMovieDetailsFromTMDB();

    
  }

  // Reference: https://stackoverflow.com/questions/40983055/how-to-reload-the-current-route-with-the-angular-2-router
  navigateToUrl(event) {
    // This will help reload the movie details page on navigating to the same page
    this.router.navigateByUrl('/auth', {skipLocationChange: true}).then(()=>
      this.router.navigate(['/home/movies/', event.id]));
  }

  getMovieDetailsFromTMDB() {
    this.movieService.getMovieDetailsByTmbdId(this.tmdbId).subscribe(
      (data) => {
        this.tmdbMovieDetails = data;
      }, error => {
        console.log(error);
        this.toastr.error("Something wrong happened with the server. Please try again later");
      }
    )
  }

  getMovieFromDatabase() {
    this.movieService.getMovieByTmdbId(this.tmdbId).subscribe(
      data => {
        this.movie = data;
        this.updateMovieLink(data.filmLink);
        if (this.authService.isUserLoggedIn()) {
          // Check if user has liked the movie
          this.movieService.checkIfUserHasLikedMovie(data.id, this.authService.getEmail()).subscribe(
            result => {
              this.haveUserLikedMovie = result;
            }, error => {
              console.log(error);
              this.toastr.error('Something wrong happened with the server. Please try again');
            }
          );

          // Check if user has rated the movie
          this.movieService.checkIfUserHasRatedMovie(this.authService.getEmail(), data.id).subscribe(
            result => {
              this.haveUserRatedMovie = result;
              // If user has rated then get the rating of the movie
              if (result) {
                this.movieService.getMovieRating(this.authService.getEmail(), data.id).subscribe(
                  value => {
                    this.ratedValue = value;
                    this.currentStarValue = this.ratedValue;
                  },
                  error => {
                    console.log(error);
                    this.toastr.error("Something wrong happned with the server. Please try again");
                  }
                )
              }
            }, error => {
              console.log(error);
              this.toastr.error("Something wrong happned with the server. Please try again");
            }
          )
        }
      }, error => {
        console.log(error);
        this.toastr.error('Something wrong happened with the server. Please try again');
      }
     )
  }

  likeMovie() {
    this.movieService.likeMovie(this.movie.id, this.authService.getEmail())
    .subscribe( data => {
      this.toastr.success("Successfully stored your liked movie!");
      this.haveUserLikedMovie = true;
    }, error => {
      console.log(error);
      this.toastr.error('Something wrong happened with the server. Please try again later');
    })
  }

  unlikeMovie() {
    this.movieService.unlikeMovie(this.movie.id, this.authService.getEmail()).subscribe( data => {
      this.toastr.success("Successfully unliked the movie");
      this.haveUserLikedMovie = false;
    }, error => {
      console.log(error);
      this.toastr.error('Something wrong happened with the server. Please try again later');
    })
  }

  youtubeUrl(key: string) {
    this.selectedVideo = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube-nocookie.com/embed/' + key + '?autoplay=1');
  }

  updateMovieLink(key: string) {
    this.movieLink = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube-nocookie.com/embed/' + key + '?autoplay=1');
  }

  imageUrl(filePath: string) {
    this.selectedImage = 'https://image.tmdb.org/t/p/original' + filePath;
  }

  getYoutubeThumbnail(key: string) {
    if (key) {
      return 'http://img.youtube.com/vi/' + key + '/hqdefault.jpg';
    }
  }

  rateMovie(value: number) {
    this.movieService.rateMovie(this.authService.getEmail(), this.movie.id, value).subscribe(
      (data) => {
        console.log(data);
        this.toastr.success("Successfully rated the movie");
      },
      (error) => {
        console.log(error);
        this.toastr.error("Something wrong happened with the server.");
      }
    )
  }

  deleteMovieRating() {
    this.movieService.deleteMovieRating(this.authService.getEmail(), this.movie.id).subscribe(
      (data) => {
        this.toastr.success("Successfully unrated the movie");
        this.ratedValue = 0;
        this.currentStarValue = this.ratedValue;
      },
      (error) => {
        console.log(error);
        this.toastr.error("Something wrong happended with the server. Please try again later");
      }
    )
  }

  generateImageLink(imageLink: string) {
    return "https://image.tmdb.org/t/p/original" + imageLink;
  }

  ngOnDestroy() {
    this.userLoggedInSubscription.unsubscribe();
  }
}
