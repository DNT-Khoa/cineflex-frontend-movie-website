import { Injectable } from "@angular/core";
import { CanLoad, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanLoad {
    constructor(private authService: AuthService, private router: Router) {

    }

    canLoad(): boolean {
        if (!this.authService.isAdminLoggedIn()) {
            this.router.navigateByUrl('/');
            return false;
        }

        return true;
    }
}