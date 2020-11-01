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

    getPostById(postId: number) {
        return this.httpClient.get<PostModal>(this.httpConfigService.getBaseUrl() + "/api/posts/" + postId);
    }
}