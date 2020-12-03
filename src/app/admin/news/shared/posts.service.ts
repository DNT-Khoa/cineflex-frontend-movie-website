import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpConfigService } from 'src/app/shared/http-config.service';
import { PostRequestModal } from './posts-request.modal';
import { PostModal } from './posts.modal';

@Injectable({
    providedIn: 'root'
})
export class NewsService {
    constructor(private httpClient: HttpClient, private httpConfigService: HttpConfigService){
    }

    searchPostByKey(key: string) {
        return this.httpClient.get<PostModal[]>(this.httpConfigService.getBaseUrl() + "/api/posts/search", {
            params: {
                key: key
            }
        });
    }

    getAllPosts() {
        return this.httpClient.get<PostModal[]>(this.httpConfigService.getBaseUrl() + "/api/posts");
    }

    getPostByPostId(postId: number) {
        return this.httpClient.get<PostModal>(this.httpConfigService.getBaseUrl() + "/api/posts/" + postId);
    }

    createPost(post: PostRequestModal) {
        return this.httpClient.post<any>(this.httpConfigService.getBaseUrl() + "/admin/posts", post);
    }

    editPost(postId: number, post: PostRequestModal) {
        return this.httpClient.put<any>(this.httpConfigService.getBaseUrl() + "/admin/posts/" + postId, post);
    }

    deletePost(postId: number) {
        return this.httpClient.delete<null>(this.httpConfigService.getBaseUrl() + "/admin/posts/" + postId);
    }
}