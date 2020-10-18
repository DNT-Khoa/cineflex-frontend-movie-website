import { Injectable } from "@angular/core";
import { CanLoad, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class UserGuard implements CanLoad {
    constructor(private authService: AuthService, private router: Router) {

    }

    canLoad(): boolean {
        if (!this.authService.isUserLoggedIn()) {
            this.router.navigateByUrl('/admin');
            return false;
        }

        return true;
    }
}