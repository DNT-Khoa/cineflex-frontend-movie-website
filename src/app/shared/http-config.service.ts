import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class HttpConfigService {
    base_url = environment.baseUrl;
    tmdbApiKey = 'bdcaebc97f97288e259e45bb8e379ccf';

    getBaseUrl() {
        return this.base_url;
    }

    getTmdbApiKey() {
        return this.tmdbApiKey;
    }
}