import { Component, OnInit } from '@angular/core';
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

  constructor(private toast: ToastrService, private categoryService: CategoriesService, private newsService: NewsService) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    return this.categoryService.getAllCategories().subscribe(
      data => {
        console.log(data);
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

}