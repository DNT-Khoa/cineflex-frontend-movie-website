import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { UserDetailsModal } from 'src/app/home/user-account/shared/user-details.modal';
import { HttpConfigService } from 'src/app/shared/http-config.service';

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    constructor(private httpClient: HttpClient, private httpConfigService: HttpConfigService, private authService: AuthService) {}

    getAdminByEmail() {
        return this.httpClient.get<UserDetailsModal>(this.httpConfigService.getBaseUrl() + "/admin", {
            params: {
                email: this.authService.getEmail()
            }
        });
    }

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

    editAdminDetails(admin: {
        firstName: string,
        lastName: string,
        oldEmail: string,
        newEmail: string
    }) {
        return this.httpClient.put<UserDetailsModal>(this.httpConfigService.getBaseUrl() + '/admin/edit', admin);
    }

    changePassword(changePasswordRequest: { email: string, oldPassword: string, newPassword: string}) {
        return this.httpClient.put(this.httpConfigService.getBaseUrl() + "/admin/changePassword", changePasswordRequest);
    }

    deleteAccount(password: string) {
        return this.httpClient.delete(this.httpConfigService.getBaseUrl() + "/admin/deleteAccount", {
            params: {
                email: this.authService.getEmail(),
                password: password,
                refreshToken: this.authService.getRefreshToken()
            }
        })
    }
}