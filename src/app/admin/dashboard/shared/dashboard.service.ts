import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpConfigService } from 'src/app/shared/http-config.service';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    constructor(private httpClient: HttpClient, private httpConfigService: HttpConfigService) {
    }

    getNumberOfTotalUsers() {
        return this.httpClient.get<number>(this.httpConfigService.getBaseUrl() + "/admin/countUsers");
    }

    getNumberOfTotalMovies() {
        return this.httpClient.get<number>(this.httpConfigService.getBaseUrl() + "/admin/countMovies");
    }

    getNumberOfTotalPosts() {
        return this.httpClient.get<number>(this.httpConfigService.getBaseUrl() + "/admin/countPosts");
    }

    getNumberOfTotalComments() {
        return this.httpClient.get<number>(this.httpConfigService.getBaseUrl() + "/admin/countComments");
    }


}