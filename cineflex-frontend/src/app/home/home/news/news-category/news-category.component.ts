import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from 'src/app/admin/categories/shared/categories.service';
import { PostModal } from 'src/app/admin/news/shared/posts.modal';
import { NewsService } from '../shared/news.service';

@Component({
  selector: 'app-news-category',
  templateUrl: './news-category.component.html',
  styleUrls: ['./news-category.component.scss']
})
export class NewsCategoryComponent implements OnInit {
  categoryName: string;
  posts: PostModal[];
  categoryId: number;

  constructor(private toastr: ToastrService, private newsService: NewsService, private activedRoute: ActivatedRoute, private categoryService: CategoriesService) { }

  ngOnInit(): void {
    this.categoryId = this.activedRoute.snapshot.params["categoryId"];
    this.getAllPostsByCategory();
    this.getCategoryById();
  }

  getAllPostsByCategory() {
    this.newsService.getAllPostsByCategory(this.categoryId).subscribe(
      data => {
        console.log(data);
        this.posts = data;
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

  shortenText(text: string, limit: number) {
    if (text.length > limit) {
      return text.substring(0, limit) + "...";
    }
  }

}
