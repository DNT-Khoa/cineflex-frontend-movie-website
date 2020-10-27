import { Injectable } from "@angular/core";
import { CanLoad, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class UserGuard implements CanLoad {
    constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {

    }

    canLoad(): boolean {
        if (this.authService.isAdminLoggedIn()) {
            this.router.navigateByUrl("/admin");
            return false;
        }

        return true;
    }
}