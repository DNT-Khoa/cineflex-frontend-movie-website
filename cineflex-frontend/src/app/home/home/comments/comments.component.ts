import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { MovieService } from '../../shared/movie.service';
import { CommentRequestModal } from './shared/comment-request.modal';
import { CommentResponseModal } from './shared/comment-response.modal';
import { CommentService } from './shared/comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  animations: [
    trigger(
      'popupAnimation', 
      [
        transition(
          ':enter', 
          [
            style({ opacity: 0 }),
            animate('.5s ease-out', 
                    style({ opacity: 1 }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({ opacity: 1 }),
            animate('.5s ease-out', 
                    style({ opacity: 0 }))
          ]
        )
      ]
    ),
  ]
})
export class CommentsComponent implements OnInit, OnDestroy {
  commentInputValue: string;
  movieOrPostId: number;
  commentType: string;
  comments: CommentResponseModal[];
  isUserLoggedIn: boolean;
  isUserLoggedInSubscription: Subscription;

  constructor(private toastrService: ToastrService, private commentService: CommentService, private router: Router, private activatedRoute: ActivatedRoute, private authService: AuthService, private movieService: MovieService) { }

  ngOnInit(): void {
    this.isUserLoggedIn = this.authService.isUserLoggedIn();

    this.isUserLoggedInSubscription = this.authService.loggedInSubject.subscribe(
      (data) => {
        this.isUserLoggedIn = data;
      }
    )

    if (this.isUserLoggedIn) {
      this.getComments();
    }
    
  }

  ngOnDestroy() {
    this.isUserLoggedInSubscription.unsubscribe();
  }

  getComments() {
    if (this.router.url.indexOf("/movies") !== -1) {
      this.commentType = "Movie";
    } else {
      this.commentType = "News";
    }

    if (this.commentType == "Movie") {
      let tmdbId = this.activatedRoute.snapshot.params["tmdbId"];
      this.movieService.getMovieByTmdbId(tmdbId).subscribe(
        data => {
          this.movieOrPostId = data.id;
        this.getAllCommentsByMovieId(this.movieOrPostId);
        }
      )
    } else {
      this.movieOrPostId = this.activatedRoute.snapshot.params["postId"];
      this.getAllCommentByPostId(this.movieOrPostId);
    }
  }

  getAllCommentsByMovieId(movieId: number) {
    this.commentService.getAllCommentsByMovieId(movieId).subscribe(
      (data) => {
        this.comments = data;
      }, 
      (error) => {
        console.log(error);
        this.toastrService.error("Something wrong happened with the server. Please try again later");
      }
    )
  }

  getAllCommentByPostId(postId: number) {
    this.commentService.getAllCommentsByPostId(postId).subscribe(
      (data) => {
        this.comments = data;
      }, 
      (error) => {
        console.log(error);
        this.toastrService.error("Something wrong happened with the server. Please try again later");
      }
    )
  }

  addNewComment() {
    if (!this.commentInputValue) {
      this.toastrService.error("Please make sure you enter something before posting comment");
      return;
    }

    let commentRequestModal = {
      content: this.commentInputValue,
      parentCommentId: null,
      movieOrPostId: this.movieOrPostId,
      commentType: this.commentType
    }

    this.commentService.addNewComment(commentRequestModal).subscribe(
      (data) => {
        this.toastrService.success("Successfully added your comment");
        this.getComments();
        this.commentInputValue = '';
      }, 
      (error) => {
        console.log(error);
        this.toastrService.error("Something wrong happened with the server. Please try again later");
      }
    )
  }


}
