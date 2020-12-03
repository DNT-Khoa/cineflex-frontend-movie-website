import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from 'src/app/admin/categories/shared/categories.service';
import { MovieModal } from 'src/app/admin/movies/shared/movie.modal';
import { MovieService } from '../../shared/movie.service';

@Component({
  selector: 'app-movies-category',
  templateUrl: './movies-category.component.html',
  styleUrls: ['./movies-category.component.scss']
})
export class MoviesCategoryComponent implements OnInit {
  categoryName: string;
  movies: MovieModal[];
  categoryId: number;

  constructor(private toastr: ToastrService, private movieService: MovieService, private activedRoute: ActivatedRoute, private categoryService: CategoriesService, private router: Router) { }

  ngOnInit(): void {
    this.categoryId = this.activedRoute.snapshot.params["categoryId"];
    this.getAllMoviesByCategory();
    this.getCategoryById();
  }


  getAllMoviesByCategory() {
    this.movieService.getAllMoviesByCategory(this.categoryId).subscribe(
      data => {
        console.log(data);
        this.movies = data;
      }, error => {
        console.log(error);
        this.toastr.error("Something wrong happened with the server. Please try again later");
      }
    )
  }

  getCategoryById() {
    this.categoryService.getCategoryById(this.categoryId).subscribe(
      value => {
        this.categoryName = value.name;
      }
    )
  }
}
