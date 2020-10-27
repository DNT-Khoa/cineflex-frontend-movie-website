import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { MovieModal } from 'src/app/admin/movies/shared/movie.modal';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { MovieService } from '../../shared/movie.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-liked-movies',
  templateUrl: './liked-movies.component.html',
  styleUrls: ['./liked-movies.component.scss']
})
export class LikedMoviesComponent implements OnInit {
  movies: MovieModal[];
  constructor(private userService: UserService, private toastr: ToastrService, private router: Router, private movieService: MovieService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getLikedMovies();
  }

  getLikedMovies() {
    this.userService.getLikedMovies().subscribe(
      data => {
        console.log(data);
        this.movies = data;
      }, error => {
        console.log(error);
        this.toastr.error("Something wrong happened with the server. Please try again later");
      }
    )
  }

  goToMoviePage(tmdbId: number) {
    this.router.navigateByUrl("/home/movies/" + tmdbId);
  }

}
