import { AfterViewInit, Component, EventEmitter, HostListener, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MovieModal } from 'src/app/admin/movies/shared/movie.modal';
import { TMDBMovieModal } from 'src/app/admin/movies/shared/tmdbmovie.modal';
import { MovieService } from '../../shared/movie.service';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss']
})
export class RecommendationsComponent implements OnInit {
  slidesToShow = 4;
  @ViewChild('myCarousel') myCarousel;
  tmdbId: number;

  @Output() startNavigating: EventEmitter<any> = new EventEmitter<any>();

  recommendations: TMDBMovieModal[] = [];
  movieStatus: string[] = [];

  constructor(private movieService: MovieService, private router: Router, private activatedRoute: ActivatedRoute, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    // Get a TMDB ID
    if (this.router.url.indexOf("/movies") > -1) {
      this.tmdbId = this.activatedRoute.snapshot.params['tmdbId'];
      this.getMovieRecommendations();
    } else {
      this.movieService.getFourLatestNowPlayingMovies().subscribe(
        data => {
          this.tmdbId = data[0].tmdbId;
          this.getMovieRecommendations();
        },
        error => {
          console.log(error);
          this.toastr.error("Something wrong happened with the server. Please try again later");
        }
      )
    }

    // This will come in handy when on different viewport 
    this.resizeWindow();
  }

  resizeWindow() {
    window.dispatchEvent(new Event('resize'));
  }

  getMovieRecommendations() {
    this.movieService.getMovieRecommendationsByTmdbId(this.tmdbId).subscribe(
      results => {
        this.recommendations = results.results;
        this.getMovieStatus();
      },
      error => {
        console.log(error),
        this.toastr.error("Something wrong happened. Please try again");
      }
    )
  }

  getMovieStatus() {
    for (let movie of this.recommendations) {
      this.movieService.checkIfMovieIsInDatabse(movie.id).subscribe(
        result => {
          movie.availability = result;
        },
        error => {
          console.log(error);
          this.toastr.error("Something wrong happened with the server. Please try again later");
        }
      )
    }
  }

  onResize(event) {
    if (event.target.innerWidth > 900) {
      this.slidesToShow = 4;
    } else if (event.target.innerWidth > 520) {
      this.slidesToShow = 3;
    } else {
      this.slidesToShow = 2;
    }
  }

  next() {
    this.myCarousel.next();
  } 

  prev() {
    this.myCarousel.prev();
  }

  generateImagePath(posterLink: string) {
    return "https://image.tmdb.org/t/p/original" + posterLink;
  }

  navigateToMovieDetailsPage(movie: TMDBMovieModal) {
    // The first conditional is for recommendation in movie details page
    if (this.router.url.indexOf("/movies") !== -1) {
      this.startNavigating.emit(movie);
    } else {
      // The second condition is for recommendation in homepage
      this.router.navigate(['/home/movies/', movie.id], { queryParams: {availability: movie.availability}});
    }
  }

}
