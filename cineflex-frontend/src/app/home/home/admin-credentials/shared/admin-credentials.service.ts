import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpConfigService } from 'src/app/shared/http-config.service';

@Injectable({
    providedIn: 'root'
})
export class AdminCredentialsService {
    constructor(private httpClient: HttpClient, private httpConfigService: HttpConfigService) {
    }

    registerAdmin(registerAdminRequest: any) {
        return this.httpClient.post<any>(this.httpConfigService.getBaseUrl() + "/api/registerAdmin", registerAdminRequest);
    }
}