import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/auth.service';
import { LoginRequestPayload } from './login-request.payload';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger(
      'backgroundOverlayAnimation', 
      [
        transition(
          ':enter', 
          [
            style({ opacity: 0 }),
            animate('.5s ease-out', 
                    style({ opacity: 0.5 }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({ opacity: 0.5 }),
            animate('.5s ease-out', 
                    style({ opacity: 0 }))
          ]
        )
      ]
    ),
    trigger(
      'popupAnimation', 
      [
        transition(
          ':enter', 
          [
            style({ opacity: 0 }),
            animate('.5s ease-out', 
                    style({ opacity: 1 }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({ opacity: 1 }),
            animate('.5s ease-out', 
                    style({ opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class LoginComponent implements OnInit {
  isLoading = false;
  isForgotPasswordFormOpen = false;
  isPasswordVisible = false;
  loginForm: FormGroup;
  loginRequestPayload: LoginRequestPayload;
  forgotPasswordForm: FormGroup;

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

    this.forgotPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    })

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
              this.toastr.success('Login Successfully');
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
            this.toastr.error('Something wrong happened. Please try again later');
          }
        }
      );
    }, 500);
  }

  forgotPassword() {
    if (!this.forgotPasswordForm.valid) {
      return;
    }

    let email = this.forgotPasswordForm.get("email").value;

    this.authService.forgotPassword(email).subscribe(
      data => {
        this.toastr.success("Successfully sent the reset password link to email: " + email);
        this.isForgotPasswordFormOpen = false;
      }, error => {
        if (error.error === 'NO_EXIST_EMAIL') {
          this.toastr.error("Email does not exists. Please try again!");
        } else {
          this.toastr.error("Something wrong happened with the server. Please try again later");
        }
      }
    )
  }

}
