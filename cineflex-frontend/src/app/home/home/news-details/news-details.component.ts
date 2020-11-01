import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PostModal } from 'src/app/admin/news/shared/posts.modal';
import { NewsService } from './shared/news.service';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.scss'],
  // To be able to style the innerhtml content in the #newsMainContent, we need to set viewencapsulation to none
  // Reference: https://stackoverflow.com/questions/44210786/style-not-working-for-innerhtml-in-angular
  encapsulation: ViewEncapsulation.None
})
export class NewsDetailsComponent implements OnInit {
  postId: number;
  post: PostModal

  constructor(private newsService: NewsService, private activedRoute: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.postId = this.activedRoute.snapshot.params['postId'];
    this.getPostById();
  }

  getPostById() {
    this.newsService.getPostById(this.postId).subscribe(
      data => {
        console.log(data);
        this.post = data;
      },
      error => {
        console.log(error);
        this.toastr.error("Something wrong happened with the server. Please try again later");
      }
    )
  }

}
