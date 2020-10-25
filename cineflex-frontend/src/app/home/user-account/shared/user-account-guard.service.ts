import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/shared/auth.service';

@Injectable({
    providedIn: 'root'
})
export class UserAccountGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {}

  canActivate(): boolean {
    if (!this.authService.isUserLoggedIn()) {
        console.log("Hello");
        this.toastr.info("Uh oh! Shame on you. Please log in first :))");
        this.router.navigateByUrl('/');
        return false;
    }

    return true;
  }
}