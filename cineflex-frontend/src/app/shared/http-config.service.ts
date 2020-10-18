import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class HttpConfigService {
    base_url = 'http://localhost:8080';

    getBaseUrl() {
        return this.base_url;
    }
}