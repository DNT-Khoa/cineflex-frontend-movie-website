import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/auth.service';
import { LoginRequestPayload } from './login-request.payload';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  isPasswordVisible = false;
  loginForm: FormGroup;
  loginRequestPayload: LoginRequestPayload;

  constructor(private authService: AuthService, private router: Router, private activedRoute: ActivatedRoute, private toastr: ToastrService) { 
    this.loginRequestPayload = {
      email: '',
      password: ''
    };
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', Validators.required)
    });

    this.activedRoute.queryParams
      .subscribe(params => {
        if (params.registered !== undefined && params.registered === 'true') {
          this.toastr.success('Signup Successful! Please login')
        }
      });
  }

  login() {
    if (!this.loginForm.valid) {
      return;
    }

    this.isLoading = true;

    this.loginRequestPayload.email = this.loginForm.get('email').value;
    this.loginRequestPayload.password = this.loginForm.get('password').value;

    setTimeout(() => {
      this.authService.login(this.loginRequestPayload).subscribe(
        data => {
          this.isLoading = false;

          if (data) {
            if (data.role === 'User') {
              this.router.navigateByUrl('/');
              this.toastr.success('Login Successful');
            } else if (data.role === 'Admin') {
              this.router.navigateByUrl('/admin');
              this.toastr.success('Welcome Admin');
            }
          }
        }, 
        error => {
          console.log(error);
          this.isLoading = false;

          if (error.error.message === 'INVALID_CREDENTIALS') {
            this.toastr.error('Incorrect Password. Please try again');
          } else if (error.error.message === 'EMAIL_NOT_EXISTS') {
            this.toastr.error('Email does not exits! Please sign up first');
          } else {
            this.toastr.error('Something wrong happend. Please try again later');
          }
        }
      );
    }, 500);
  }

}
