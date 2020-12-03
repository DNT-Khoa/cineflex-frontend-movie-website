import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { HttpConfigService } from 'src/app/shared/http-config.service';
import { CommentRequestModal } from './comment-request.modal';
import { CommentResponseModal } from './comment-response.modal';

@Injectable({
    providedIn: 'root'
})
export class CommentService {
    constructor(private httpClient: HttpClient, private httpConfigService: HttpConfigService, private authService: AuthService) {
    }

    getAllCommentsByMovieId(movieId: number) {
        return this.httpClient.get<CommentResponseModal[]>(this.httpConfigService.getBaseUrl() + "/user/comments/byMovieId/" + movieId);
    }

    getAllCommentsByPostId(postId: number) {
        return this.httpClient.get<CommentResponseModal[]>(this.httpConfigService.getBaseUrl() + "/user/comments/byPostId/" + postId);
    }

    getCommentByCommentId(commentId: number) {
        return this.httpClient.get<CommentResponseModal>(this.httpConfigService.getBaseUrl() + "/user/comments/" + commentId);
    }

    addNewComment(commentRequest: CommentRequestModal) {
        return this.httpClient.post<CommentResponseModal>(this.httpConfigService.getBaseUrl() + "/user/comments", commentRequest, {
            params: {
                email : this.authService.getEmail()
            }
        })
    }

    likeComment(commentId: number) {
        return this.httpClient.post<null>(this.httpConfigService.getBaseUrl() + "/user/comments/likeComment/" + commentId, null, {
            params: {
                email: this.authService.getEmail()
            }
        })
    }

    unlikeComment(commentId: number) {
        return this.httpClient.post<null>(this.httpConfigService.getBaseUrl() + "/user/comments/unLikeComment/" + commentId, null, {
            params: {
                email: this.authService.getEmail()
            }
        })
    }

    deleteCommentById(commentId: number) {
        return this.httpClient.delete<any>(this.httpConfigService.getBaseUrl() + "/user/comments/" + commentId)
    }

    getAvatarOfUserByEmail(email: string) {
        return this.httpClient.get<any>(this.httpConfigService.getBaseUrl() + "/user/getAvatar", {
            params: {
                email: email
            }
        });
    }
}