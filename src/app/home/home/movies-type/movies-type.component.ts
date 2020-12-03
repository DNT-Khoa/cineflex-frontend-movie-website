import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MovieModal } from 'src/app/admin/movies/shared/movie.modal';
import { MovieService } from '../../shared/movie.service';

@Component({
  selector: 'app-movies-type',
  templateUrl: './movies-type.component.html',
  styleUrls: ['./movies-type.component.scss']
})
export class MoviesTypeComponent implements OnInit {
  movies: MovieModal[];
  typeName = '';

  constructor(private movieService: MovieService, private toastr: ToastrService, private activedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.filterAndFetchMovieType();
  }

  filterAndFetchMovieType() {
    let movieType = this.activedRoute.snapshot.params['movieType'];

    switch (movieType) {
      case 'comingsoon': {
        this.typeName = "Coming Soon";
        this.getAllComingSoonMovies();
        break;
      }
      case 'nowplaying': {
        this.typeName = "Now Playing";
        this.getAllNowPlayingMovies();
        break;
      } case 'toprated': {
        this.typeName = "Top Rated";
        this.getAllTopRatedMovies();
        break;
      } default: {
        this.typeName = "All";
        this.getAllMovies();
        break;
      }
    }
  }

  getAllNowPlayingMovies() {
    this.movieService.getAllNowplayingMovies().subscribe(
      data => {
        this.movies = data;
      }, error => {
        console.log(error);
        this.toastr.error("Something wrong happened with the server. Please try again later");
      }
    )
  }

  getAllMovies() {
    this.movieService.getAllMovies().subscribe(
      data => {
        this.movies = data;
      }, error => {
        console.log(error);
        this.toastr.error("Something wrong happened with the server. Please try again later");
      }
    )
  }

  getAllComingSoonMovies() {
    this.movieService.getAllComingSoonMovies().subscribe(
      data => {
        this.movies = data;
      }, error => {
        console.log(error);
        this.toastr.error("Something wrong happened with the server. Please try again later");
      }
    )
  }

  getAllTopRatedMovies() {
    this.movieService.getAllTopRatedMovies().subscribe(
      data => {
        this.movies = data;
      }, error => {
        console.log(error);
        this.toastr.error("Something wrong happened with the server. Please try again later");
      }
    )
  }

}
