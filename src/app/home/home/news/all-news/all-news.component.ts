import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PostModal } from 'src/app/admin/news/shared/posts.modal';
import { NewsService } from '../shared/news.service';

@Component({
  selector: 'app-all-news',
  templateUrl: './all-news.component.html',
  styleUrls: ['./all-news.component.scss']
})
export class AllNewsComponent implements OnInit {
  posts: PostModal[];
  constructor(private toastr: ToastrService, private newsService: NewsService) { }

  ngOnInit(): void {
    this.getAllPosts();
  }

  getAllPosts() {
    this.newsService.getAllPosts().subscribe(
      data => {
        this.posts = data;
      }, error => {
        console.log(error);
        this.toastr.error("Something wrong happened with the server. Please try again later");
      }
    )
  }

  shortenText(text: string, limit: number) {
    if (text.length > limit) {
      return text.substring(0, limit) + "...";
    }
  }

}
