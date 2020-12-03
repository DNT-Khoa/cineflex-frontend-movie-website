import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class HttpConfigService {
    base_url = 'http://localhost:8080';
    tmdbApiKey = 'bdcaebc97f97288e259e45bb8e379ccf';

    getBaseUrl() {
        return this.base_url;
    }

    getTmdbApiKey() {
        return this.tmdbApiKey;
    }
}