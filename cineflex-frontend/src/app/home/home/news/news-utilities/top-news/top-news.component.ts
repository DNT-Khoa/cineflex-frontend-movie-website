import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PostModal } from 'src/app/admin/news/shared/posts.modal';
import { NewsService } from '../../shared/news.service';

@Component({
  selector: 'app-top-news',
  templateUrl: './top-news.component.html',
  styleUrls: ['./top-news.component.scss']
})
export class TopNewsComponent implements OnInit {
  posts: PostModal[] = [];
  @Input() shouldBreak: boolean;

  constructor(private toast: ToastrService, private newsService: NewsService) { }

  ngOnInit(): void {
    this.getFourTopNews();
  }

  getFourTopNews() {
    this.newsService.getFourTopNews().subscribe(
      data => {
        this.posts = data;
      }, 
      error => {
        console.log(error);
        this.toast.error("Something wrong happened with the server. Please try again later");
      }
    )
  }

  shortenText(text: string, limit: number) {
    if (text !== null) {
      if (text.length > limit) {
        return text.substring(0, limit) + "...";
      }
    }
  }
}
