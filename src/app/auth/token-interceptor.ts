import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { LoginResponse } from './login/login-response.payload';
import { AuthService } from './shared/auth.service';

@Injectable({
    providedIn: "root"
})
export class TokenInterceptor implements HttpInterceptor {
    isTokenRefreshing = false;

    refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor(public authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // We don't want to intercept the login, signup, refresh and api requests
        if (req.url.indexOf('refresh') !== -1 || req.url.indexOf('login') !== -1 || req.url.indexOf('signup') !== -1 || req.url.indexOf('api') !== -1) {
            console.log("Yes there is a problem")
            return next.handle(req);
        }

        const jwtToken = this.authService.getJwtToken();

        if (jwtToken) {
            req = this.addToken(req, jwtToken);
        }

        return next.handle(req).pipe(catchError( error => {
            console.log(error);
            if (error instanceof HttpErrorResponse && error.status === 401) {
                // This will check for the case { responseType: 'text' } and { responseType: 'json'}
                if ( (error.error.cause && error.error.cause.includes("EXPIRED_TOKEN")) || (error.error && error.error.includes("EXPIRED_TOKEN")) ) {
                    return this.handleAuthErrors(req, next);
                } else {
                    return throwError(error);
                }
            } else {
                return throwError(error);
            }
        }))
    }

    private handleAuthErrors(req: HttpRequest<any>, next: HttpHandler) {
        // This method will make a request to get the request token from the server
        // Additionally, we set the isTokenRefreshing to true and trigger the refreshTokenSubject to null as 
        // as way to block other requests sending at the same time
        if (!this.isTokenRefreshing) {
            this.isTokenRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.authService.refreshToken().pipe(
                switchMap((refreshTokenResonse: LoginResponse) => {
                    this.isTokenRefreshing = false;
                    this.refreshTokenSubject.next(refreshTokenResonse.authenticationToken);
                    return next.handle(this.addToken(req, refreshTokenResonse.authenticationToken));
                })
            )
        } else {
            return this.refreshTokenSubject.pipe(
                filter(jwtToken => jwtToken !== null),
                take(1),
                switchMap(jwtToken => {
                    return next.handle(this.addToken(req, jwtToken));
                }) 
            )
        }
    }

    addToken(req: HttpRequest<any>, jwtToken: any) {
        return req.clone({
            setHeaders: {
                'Authorization': `Bearer ${jwtToken}`
            }
        });
    }


}