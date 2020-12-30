import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable, Subject, throwError } from 'rxjs';
import { LoginRequestPayload } from '../login/login-request.payload';
import { LoginResponse } from '../login/login-response.payload';
import { SignupRequestPayload } from '../signup/signup-request.payload';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpConfigService } from 'src/app/shared/http-config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loggedInSubject: Subject<any> = new Subject<any>();
  public avatarChangeSubject: Subject<any> = new Subject<any>();
  constructor(private httpClient: HttpClient, private localStorage: LocalStorageService, private toastr: ToastrService, private router: Router, private httpConfigService: HttpConfigService) {}

  signup(signupRequestPayload: SignupRequestPayload): Observable<any> {
    return this.httpClient.post(this.httpConfigService.getBaseUrl() + '/api/auth/signup', signupRequestPayload, { responseType: 'text'});
  }

  refreshTokenPayload = {
    refreshToken: '',
    email: '',
    role: ''
  }

  login(loginRequestPayload: LoginRequestPayload) {
    return this.httpClient.post<LoginResponse>(this.httpConfigService.getBaseUrl() + '/api/auth/login', loginRequestPayload)
      .pipe(
        tap((data) => {
          // Store important information in the local storage
          this.localStorage.store('authenticationToken', data.authenticationToken);
          this.localStorage.store('refreshToken', data.refreshToken);
          this.localStorage.store('email', data.email);
          this.localStorage.store('expiresAt', data.expiresAt);
          this.localStorage.store('role', data.role);
          
          this.getAvatarByEmail();
        })
      );
  }


  public getAvatarByEmail() {
    this.httpClient.get<any>(this.httpConfigService.getBaseUrl() + "/user/getAvatar", {
        params: {
            email: this.getEmail()
        }
    }).subscribe(
      data => {
        let base64Data = data.picByte;
        let avatarImage = "data:image/png;base64," + base64Data;
        this.localStorage.store('avatarImage', avatarImage);
        this.avatarChangeSubject.next(this.getAvatarImageFromLocalHost());
    }
    )
}

  forgotPassword(email: string) {
    return this.httpClient.post<any>(this.httpConfigService.getBaseUrl() + "/api/auth/forgotPassword", null, {
      params: {
        email: email
      }
    })
  }

  refreshToken() {
    this.updateRefreshTokenPayload();
    return this.httpClient.post<LoginResponse>(this.httpConfigService.getBaseUrl() + '/api/auth/refresh/token', this.refreshTokenPayload)
      .pipe(
        tap(response => {
          this.localStorage.store('authenticationToken', response.authenticationToken);
          this.localStorage.store('expiresAt', response.expiresAt);
        })
      );
  }

  logout() {
    this.updateRefreshTokenPayload();

    this.httpClient.post(this.httpConfigService.getBaseUrl() + '/api/auth/logout', this.refreshTokenPayload, { responseType: 'text'})
      .subscribe(
        data => {
          this.toastr.success('Successfully logged out!');
          this.loggedInSubject.next(false);
          this.router.navigateByUrl('/');
        }, error => {
          throwError(error);
          this.toastr.error('Something wrong happened. Please try again later!');
        }
      );
    
    this.clearDataStorage();
  }

  updateRefreshTokenPayload() {
    this.refreshTokenPayload.refreshToken = this.getRefreshToken();
    this.refreshTokenPayload.email = this.getEmail();
    this.refreshTokenPayload.role = this.getRole();
  }

  getJwtToken() {
    return this.localStorage.retrieve('authenticationToken');
  }

  getRefreshToken() {
    return this.localStorage.retrieve('refreshToken');
  }

  getEmail() {
    return this.localStorage.retrieve('email');
  }

  getExpirationTime() {
    return this.localStorage.retrieve('expiresAt');
  }

  getRole() {
    return this.localStorage.retrieve('role');
  }

  getAvatarImageFromLocalHost() {
    return this.localStorage.retrieve('avatarImage');
  }

  isUserLoggedIn(): boolean {
    return this.getJwtToken() !== null && this.getRole() === 'User';
  }

  isAdminLoggedIn(): boolean {
    return this.getJwtToken() !== null && this.getRole() === 'Admin';
  }


  notifyUserLoggedOut() {
    this.loggedInSubject.next(false);
  }

  clearDataStorage() {
    this.localStorage.clear('authenticationToken');
    this.localStorage.clear('email');
    this.localStorage.clear('refreshToken');
    this.localStorage.clear('role');
    this.localStorage.clear('expiresAt');
    this.localStorage.clear('avatarImage');
  }
}
