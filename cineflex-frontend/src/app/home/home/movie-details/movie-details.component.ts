import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MovieModal } from 'src/app/admin/movies/shared/movie.modal';
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
export class MovieDetailsComponent implements OnInit {
  isVideoOpen = false;
  movie: MovieModal;
  tmdbMovieDetails: TMDBMovieDetailsModal;
  tmdbId: number;
  selectedVideo: any;

  constructor(private movieService: MovieService, private activedRoute: ActivatedRoute, private toastr: ToastrService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    // Subscription to get the tmdbId from the URL
    this.tmdbId = this.activedRoute.snapshot.params['tmdbId'];
    console.log(this.tmdbId);

    // Get Movie Details from tmdbID
    this.movieService.getMovieDetailsByTmbdId(this.tmdbId).subscribe(
      (data) => {
        this.tmdbMovieDetails = data;
      }
    )

    // Get movie from the server from TMDB ID
    this.movieService.getMovieByTmdbId(this.tmdbId).subscribe(
      (data) => {
        this.movie = data;
      },
      (error) => {
        console.log(error);
        this.toastr.error('Something wrong happened with the API. Please try again');
      }
    )
  }

  youtubeUrl(key: string) {
    this.selectedVideo = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube-nocookie.com/embed/' + key + '?autoplay=1');
  }

  getYoutubeThumbnail(key: string) {
    return 'http://img.youtube.com/vi/' + key + '/hqdefault.jpg';
  }

}
