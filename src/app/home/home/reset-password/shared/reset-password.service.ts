import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpConfigService } from 'src/app/shared/http-config.service';

@Injectable({
    providedIn: 'root'
})
export class ResetPasswordService {
    constructor(private httpClient: HttpClient, private httpConfigService: HttpConfigService){}

    resetPassword(password: String, token: String) {
        return this.httpClient.post<any>(this.httpConfigService.getBaseUrl() + "/api/auth/resetPassword",
            {
                password: password,
                token: token
            }
        );
    }
}