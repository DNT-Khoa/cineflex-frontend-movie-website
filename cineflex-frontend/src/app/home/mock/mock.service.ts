import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: "root"
})
export class MockService {
    constructor(private httpClient: HttpClient) {

    }

    getStatus() {
        return this.httpClient.get('http://localhost:8080/admin/status/check', {responseType: 'text'});
    }
}