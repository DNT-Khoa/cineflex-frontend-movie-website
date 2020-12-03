import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { MovieService } from 'src/app/home/shared/movie.service';
import { UserDetailsModal } from 'src/app/home/user-account/shared/user-details.modal';
import { UserService } from 'src/app/home/user-account/shared/user.service';
import { CommentResponseModal } from '../shared/comment-response.modal';
import { CommentService } from '../shared/comments.service';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss'],
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
export class CommentItemComponent implements OnInit {
  isReplyAreaOpen = false;
  commentInputValue: string;
  shouldTheDeleteButtonIsShown = false;
  userAvatar: any;
  numberOfLikedUser: string;
  user: UserDetailsModal;
  movieOrPostId: number;
  commentType: string;
  hasTheUserLikedTheComment = false;

  @Input() comment: CommentResponseModal;
  @Output() getCommentsNotifyEmitter: EventEmitter<any> = new EventEmitter<any>();

  commentLevel: number;
  paddingLeftWidth: string;

  constructor(private commentService: CommentService, private sanitizer: DomSanitizer, private userService: UserService, private toastrService: ToastrService, private authService: AuthService, private router: Router, private activedRoute: ActivatedRoute, private movieService: MovieService) { }

  ngOnInit(): void {
    this.getUser(this.comment.email);
    this.getAvatarOfUserByEmail(this.comment.email);

    this.updateNumberOfLikeUsers(this.comment.likedByUsers.length);

    if (this.authService.getEmail() === this.comment.email) {
      this.shouldTheDeleteButtonIsShown = true;
    }

    if (this.router.url.indexOf("/movies") !== -1) {
      this.commentType = "Movie";
    } else {
      this.commentType = "News";
    }

    if (this.commentType === "Movie") {
      let tmdbId = this.activedRoute.snapshot.params["tmdbId"];
      this.movieService.getMovieByTmdbId(tmdbId).subscribe(
        data => {
          this.movieOrPostId = data.id;
        }
      )
    } else {
      this.movieOrPostId = this.activedRoute.snapshot.params["postId"];
    }

    this.calculateCommentLevel();

    for (let user of this.comment.likedByUsers) {
      if (user.email === this.authService.getEmail()) {
        this.hasTheUserLikedTheComment = true;
      }
    }
    
  }

  updateNumberOfLikeUsers(amount: number) {
    if (amount == 0) {
      this.numberOfLikedUser = '';
    } else {
      this.numberOfLikedUser = amount.toString();
    }
  }

  getAvatarOfUserByEmail(email: string) {
    this.commentService.getAvatarOfUserByEmail(email).subscribe(
      (data) => {
        if (data) {
          let base64Data = data.picByte;
          this.userAvatar = "data:image/png;base64," + base64Data;
        }
      }
    )
  }

  getUser(email: string) {
    this.userService.getUserDetailsByEmail(email).subscribe(
      (data) => {
        this.user = data;
      }, (error) => {
        console.log(error);
        this.toastrService.error("Something wrong happened with the server. Please try again later");
      }
    )
  }

  replyToComment() {
    if (!this.commentInputValue) {
      this.toastrService.error("Please make sure to fill in the comment section something before posting your comment");
      return;
    }

    let commentRequestModal = {
      content: this.commentInputValue,
      parentCommentId: this.comment.id,
      movieOrPostId: this.movieOrPostId,
      commentType: this.commentType
    }

    this.commentService.addNewComment(commentRequestModal).subscribe(
      (data) => {
        this.toastrService.success("Successfully added your comment");
        this.getCommentsNotifyEmitter.emit(null);
        this.commentInputValue = '';
      }, 
      (error) => {
        console.log(error);
        this.toastrService.error("Something wrong happened with the server. Please try again later");
      }
    )

  }

  deleteCommentById() {
    this.commentService.deleteCommentById(this.comment.id).subscribe(
      data => {
        this.toastrService.success("Successfully deleted your comment");
        this.getCommentsNotifyEmitter.emit(null);
        this.commentInputValue = '';
      }, 
      error => {
        console.log(error);
        this.toastrService.error("Something wrong happened");
      }
    )
  }

  likeComment() {
    this.commentService.likeComment(this.comment.id).subscribe(
      data => {
        this.toastrService.success("Successfully liked the comment");
        this.updateNumberOfLikeUsers(this.comment.likedByUsers.length + 1);
        this.removeUserFromLikedByUser(this.comment.email);
        this.hasTheUserLikedTheComment = true;
      }, error => {
        console.log(error);
        this.toastrService.error("Something wrong happened");
      }
    )
  }

  unlikeComment() {
    this.commentService.unlikeComment(this.comment.id).subscribe(
      data => {
        this.toastrService.success("Successfully unliked the comment");
        this.updateNumberOfLikeUsers(this.comment.likedByUsers.length - 1);
        this.removeUserFromLikedByUser(this.comment.email);
        this.hasTheUserLikedTheComment = false;
      }, error => {
        console.log(error);
        this.toastrService.error("Something wrong happened");
      }
    )
  }

  removeUserFromLikedByUser(email: string) {
    for (let i = 0; i < this.comment.likedByUsers.length; i++) {
      if (this.comment.likedByUsers[i].email === email) {
        this.comment.likedByUsers.splice(0, 1);
        return;
      }
    }
  }

  calculateCommentLevel() {
    this.commentLevel = this.comment.path.length / 3;
    
    this.paddingLeftWidth = ((this.commentLevel - 1) * 76).toString() + 'px';
  }

  sanitizeUrl(data: any) {
    return this.sanitizer.bypassSecurityTrustUrl(data);
  }

}
