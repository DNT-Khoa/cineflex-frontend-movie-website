import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { MovieModal } from 'src/app/admin/movies/shared/movie.modal';
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

    getUserDetailsByEmail(email: string) {
        return this.httpClient.get<UserDetailsModal>(this.httpConfigService.getBaseUrl() + '/user', {
            params: {
                email: email
            }
        });
    }

    getLikedMovies() {
        return this.httpClient.get<MovieModal[]>(this.httpConfigService.getBaseUrl() + "/user/likedMovies", {
            params: {
                email: this.authService.getEmail()
            }
        })
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
                password: password,
                refreshToken: this.authService.getRefreshToken()
            }
        })
    }

    uploadImage(uploadImageData: any) {
        return this.httpClient.post<any>(this.httpConfigService.getBaseUrl() + "/user/changeAvatar", uploadImageData, {
            params: {
                email: this.authService.getEmail()
            }
        });
    }
}