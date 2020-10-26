import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MovieModal } from 'src/app/admin/movies/shared/movie.modal';
import { MovieService } from 'src/app/home/shared/movie.service';

@Component({
  selector: 'app-type-all',
  templateUrl: './type-all.component.html',
  styleUrls: ['./type-all.component.scss']
})
export class TypeAllComponent implements OnInit {
  movies: MovieModal[];

  constructor(private movieService: MovieService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies() {
    this.movieService.getAllMoviesLimit4().subscribe(
      (data) => {
        this.movies = data;
      }, error => {
        console.log(error);
        this.toastr.error("Something wrong happened with the server. Please try again later");
      }
    )
  }

}
