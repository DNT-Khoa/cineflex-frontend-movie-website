import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
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
                    style({ opacity: 0.25 }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({ opacity: 0.25 }),
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
  isUserLoggedIn = false;
  haveUserLikedMovie = false;
  isVideoOpen = false;
  isImageOpen = false;
  movie: MovieModal;
  tmdbMovieDetails: TMDBMovieDetailsModal;
  tmdbId: number;
  selectedVideo: any;
  selectedImage: any;
  userLoggedInSubscription: Subscription;

  constructor(private movieService: MovieService, private activedRoute: ActivatedRoute, private toastr: ToastrService, private sanitizer: DomSanitizer, private authService: AuthService) { }

  ngOnInit(): void {
    // Check first to see if the user has logged in
    this.isUserLoggedIn = this.authService.isUserLoggedIn();

    // Subscribe to be notified in case user logs out in the future
    this.userLoggedInSubscription = this.authService.loggedInSubject.subscribe(
      (result) => {
        this.isUserLoggedIn = result;
      }
    )

    // Subscription to get the tmdbId from the URL
    this.tmdbId = this.activedRoute.snapshot.params['tmdbId'];

    // Get Movie Details from tmdbID
    this.movieService.getMovieDetailsByTmbdId(this.tmdbId).subscribe(
      (data) => {
        this.tmdbMovieDetails = data;
      }
    )

    this.movieService.getMovieByTmdbId(this.tmdbId).subscribe(
      data => {
        this.movie = data;
        if (this.authService.isUserLoggedIn()) {
          this.movieService.checkIfUserHasLikedMovie(data.id, this.authService.getEmail()).subscribe(
            result => {
              this.haveUserLikedMovie = result;
            }, error => {
              console.log(error);
              this.toastr.error('Something wrong happened with the server. Please try again');
            }
          );
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

  imageUrl(filePath: string) {
    this.selectedImage = 'https://image.tmdb.org/t/p/original' + filePath;
  }

  getYoutubeThumbnail(key: string) {
    if (key) {
      return 'http://img.youtube.com/vi/' + key + '/hqdefault.jpg';
    }
  }

  ngOnDestroy() {
    this.userLoggedInSubscription.unsubscribe();
  }

}
