import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from 'src/app/admin/categories/shared/categories.service';
import { CategoryModal } from 'src/app/admin/categories/shared/category.modal';
import { NewsService } from '../../shared/news.service';

@Component({
  selector: 'app-category-navigator',
  templateUrl: './category-navigator.component.html',
  styleUrls: ['./category-navigator.component.scss']
})
export class CategoryNavigatorComponent implements OnInit {
  categories: CategoryModal[];
  categoryLimit = 5;
  isMoreButtonVisible = true;

  constructor(private toast: ToastrService, private categoryService: CategoriesService, private newsService: NewsService, private router: Router) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    return this.categoryService.getAllCategories().subscribe(
      data => {
        this.categories = data;

        this.getCountPostPerCategory();
      }
    )
  }

  getCountPostPerCategory() {
    for (let category of this.categories) {
      this.newsService.getCountPostPerCategory(category.id).subscribe(
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
    if (this.router.url.indexOf("/category") !== -1) {
        this.router.navigateByUrl('/auth', {skipLocationChange: true}).then(()=>
          this.router.navigate(['/home/news/category/', category.id]));
    } else {
      this.router.navigate(['/home/news/category/', category.id]);
    }
  }

}
