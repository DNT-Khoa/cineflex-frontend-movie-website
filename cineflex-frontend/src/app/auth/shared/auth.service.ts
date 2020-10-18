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

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loggedInSubject: Subject<any> = new Subject<any>();
  constructor(private httpClient: HttpClient, private localStorage: LocalStorageService, private toastr: ToastrService, private router: Router) {}

  signup(signupRequestPayload: SignupRequestPayload): Observable<any> {
    return this.httpClient.post('http://localhost:8080/api/auth/signup', signupRequestPayload, { responseType: 'text'});
  }

  refreshTokenPayload = {
    refreshToken: '',
    email: '',
    role: ''
  }

  login(loginRequestPayload: LoginRequestPayload) {
    return this.httpClient.post<LoginResponse>('http://localhost:8080/api/auth/login', loginRequestPayload)
      .pipe(
        tap((data) => {
          // Store important information in the local storage
          this.localStorage.store('authenticationToken', data.authenticationToken);
          this.localStorage.store('refreshToken', data.refreshToken);
          this.localStorage.store('email', data.email);
          this.localStorage.store('expiresAt', data.expiresAt);
          this.localStorage.store('role', data.role);
        })
      );
  }

  refreshToken() {
    this.updateRefreshTokenPayload();
    return this.httpClient.post<LoginResponse>('http://localhost:8080/api/auth/refresh/token', this.refreshTokenPayload)
      .pipe(
        tap(response => {
          this.localStorage.store('authenticationToken', response.authenticationToken);
          this.localStorage.store('expiresAt', response.expiresAt);
        })
      );
  }

  logout() {
    this.updateRefreshTokenPayload();

    this.httpClient.post('http://localhost:8080/api/auth/logout', this.refreshTokenPayload, { responseType: 'text'})
      .subscribe(
        data => {
          console.log(data);
          this.toastr.success('Logout Successful!');
          this.loggedInSubject.next(false);
          this.router.navigateByUrl('/');
        }, error => {
          throwError(error);
          this.toastr.error('Something wrong happend. Please try again later!');
        }
      );
    this.localStorage.clear('authenticationToken');
    this.localStorage.clear('email');
    this.localStorage.clear('refreshToken');
    this.localStorage.clear('role');
    this.localStorage.clear('expiresAt');
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

  isUserLoggedIn(): boolean {
    return this.getJwtToken() !== null && this.getRole() === 'User';
  }

  isAdminLoggedIn(): boolean {
    return this.getJwtToken() !== null && this.getRole() === 'Admin';
  }
}
