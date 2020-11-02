import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostModal } from 'src/app/admin/news/shared/posts.modal';
import { HttpConfigService } from 'src/app/shared/http-config.service';

@Injectable({
    providedIn: 'root'
})
export class NewsService {
    constructor(private httpClient: HttpClient, private httpConfigService: HttpConfigService) {
        
    }

    getCountPostPerCategory(categoryId: number) {
        return this.httpClient.get<number>(this.httpConfigService.getBaseUrl() + "/api/posts/count", {
            params: {
                categoryId: categoryId.toString()
            }
        })
    }

    getAllPostsByCategory(categoryId: number) {
        return this.httpClient.get<PostModal[]>(this.httpConfigService.getBaseUrl() + "/api/posts/byCategory", {
            params: {
                categoryId: categoryId.toString()
            }
        })
    }

    getAllPosts() {
        return this.httpClient.get<PostModal[]>(this.httpConfigService.getBaseUrl() + "/api/posts");
    }

    getPostById(postId: number) {
        return this.httpClient.get<PostModal>(this.httpConfigService.getBaseUrl() + "/api/posts/" + postId);
    }

    searchPostByKey(key: string) {
        return this.httpClient.get<PostModal[]>(this.httpConfigService.getBaseUrl() + "/api/posts/search", {
            params: {
                key: key
            }
        });
    }

    updateView(postId: number) {
        return this.httpClient.put<null>(this.httpConfigService.getBaseUrl() + "/api/posts/updateView/" + postId, null);
    }
}