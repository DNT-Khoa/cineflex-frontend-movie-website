import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { HttpConfigService } from 'src/app/shared/http-config.service';
import { UserDetailsModal } from './user-details.modal';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private httpClient: HttpClient, private toastr: ToastrService, private authService: AuthService, private httpConfigService: HttpConfigService) {}

    getUserDetails() {
        return this.httpClient.get<UserDetailsModal>(this.httpConfigService.getBaseUrl() + '/user', {
            params: {
                email: this.authService.getEmail()
            }
        });
    }

    editUserDetails(user: {
        firstName: string,
        lastName: string,
        oldEmail: string,
        newEmail: string
    }) {
        return this.httpClient.put<UserDetailsModal>(this.httpConfigService.getBaseUrl() + '/user/edit', user);
    }

    changePassword(changePasswordRequest: { email: string, oldPassword: string, newPassword: string}) {
        return this.httpClient.put(this.httpConfigService.getBaseUrl() + "/user/changePassword", changePasswordRequest);
    }

    deleteAccount(password: string) {
        return this.httpClient.delete(this.httpConfigService.getBaseUrl() + "/user/deleteAccount", {
            params: {
                email: this.authService.getEmail(),
                password: password
            }
        })
    }
}