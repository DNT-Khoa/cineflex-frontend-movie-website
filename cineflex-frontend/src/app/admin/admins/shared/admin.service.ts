import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDetailsModal } from 'src/app/home/user-account/shared/user-details.modal';
import { HttpConfigService } from 'src/app/shared/http-config.service';

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    constructor(private httpClient: HttpClient, private httpConfigService: HttpConfigService) {}

    getAllAdmins() {
        return this.httpClient.get<UserDetailsModal[]>(this.httpConfigService.getBaseUrl() + "/admin/all");
    }

    inviteAdmin(email: string) {
        return this.httpClient.post<null>(this.httpConfigService.getBaseUrl() + "/admin/inviteAdmin", null, {
            params: {
                email: email
            }
        });
    }

    searchAdminByEmailKey(key: string) {
        return this.httpClient.get<UserDetailsModal[]>(this.httpConfigService.getBaseUrl() + "/admin/search", {
            params: {
                key: key
            }
        })
    }
}