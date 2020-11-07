import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from 'src/app/admin/categories/shared/categories.service';
import { CategoryModal } from 'src/app/admin/categories/shared/category.modal';
import { MovieService } from 'src/app/home/shared/movie.service';

@Component({
  selector: 'app-movie-category-navigator',
  templateUrl: './movie-category-navigator.component.html',
  styleUrls: ['./movie-category-navigator.component.scss']
})
export class MovieCategoryNavigatorComponent implements OnInit {
  categories: CategoryModal[];
  categoryLimit = 5;
  isMoreButtonVisible = true;


  constructor(private toast: ToastrService, private categoryService: CategoriesService, private movieService: MovieService, private router: Router) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    return this.categoryService.getAllCategories().subscribe(
      data => {
        this.categories = data;

        this.getCountMoviePerCategory();
      }
    )
  }

  getCountMoviePerCategory() {
    for (let category of this.categories) {
      this.movieService.getCountMoviePerCategory(category.id).subscribe(
        value => {
          category.numOfPosts = value;
        },
        error => {
          console.log(error);
          this.toast.error("Something wrong happened with the server. Please try again later");
        }
      )
    }
  }

  navigateToUrl(category: CategoryModal) {
    if (this.router.url.indexOf("movies/category") !== -1) {
        this.router.navigateByUrl('/auth', {skipLocationChange: true}).then(()=>
          this.router.navigate(['/home/movies/category/', category.id]));
    } else {
      this.router.navigate(['/home/movies/category/', category.id]);
    }
  }


}
