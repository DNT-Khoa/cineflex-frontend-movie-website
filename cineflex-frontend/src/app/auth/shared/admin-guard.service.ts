import { Injectable } from "@angular/core";
import { CanLoad, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanLoad {
    constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {

    }

    canLoad(): boolean {
        if (!this.authService.isAdminLoggedIn()) {
            this.toastr.info("Uh oh! Not so easy man :)). I have already throught about this. Wish you luck next time :)))))");
            this.router.navigateByUrl('/');
            return false;
        }

        return true;
    }
}