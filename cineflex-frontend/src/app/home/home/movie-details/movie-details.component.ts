import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MovieModal } from 'src/app/admin/movies/shared/movie.modal';
import { MovieService } from '../../shared/movie.service';
import { TMDBMovieDetailsModal } from '../../shared/tmdbMovieDetails.modal';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  baseCreditNumber = -1;
  movie: MovieModal;
  tmdbMovieDetails: TMDBMovieDetailsModal;
  tmdbId: number;

  constructor(private movieService: MovieService, private activedRoute: ActivatedRoute, private toastr: ToastrService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    // Subscription to get the tmdbId from the URL
    this.tmdbId = this.activedRoute.snapshot.params['tmdbId'];
    console.log(this.tmdbId);

    // Get Movie Details from tmdbID
    this.movieService.getMovieDetailsByTmbdId(this.tmdbId).subscribe(
      (data) => {
        console.log(data);
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
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + key);
  }


}
