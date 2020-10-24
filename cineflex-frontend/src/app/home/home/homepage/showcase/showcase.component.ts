import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MovieModal } from 'src/app/admin/movies/shared/movie.modal';
import { MovieService } from '../../../shared/movie.service';

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.scss']
})
export class ShowcaseComponent implements OnInit {
  movies: MovieModal[] = [];

  constructor(private movieService: MovieService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.movieService.getFourLatestNowPlayingMovies().subscribe(
      (movies) => {
        this.movies = movies;
      }, 
      (error) => {
        console.log(error);
        this.toastr.error('Something wrong happened. Please try again later');
      }
    )
  }

}
