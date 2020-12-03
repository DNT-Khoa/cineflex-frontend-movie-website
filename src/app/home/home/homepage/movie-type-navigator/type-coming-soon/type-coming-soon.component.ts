import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MovieModal } from 'src/app/admin/movies/shared/movie.modal';
import { MovieService } from 'src/app/home/shared/movie.service';

@Component({
  selector: 'app-type-coming-soon',
  templateUrl: './type-coming-soon.component.html',
  styleUrls: ['./type-coming-soon.component.scss']
})
export class TypeComingSoonComponent implements OnInit {
  movies: MovieModal[];

  constructor(private movieService: MovieService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies() {
    this.movieService.getFourLatestComingSoonMovies().subscribe(
      (data) => {
        this.movies = data;
      }, error => {
        console.log(error);
        this.toastr.error("Something wrong happened with the server. Please try again later");
      }
    )
  }

}
