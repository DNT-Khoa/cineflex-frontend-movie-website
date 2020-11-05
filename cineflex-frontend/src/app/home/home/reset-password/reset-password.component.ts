import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ResetPasswordService } from './shared/reset-password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  isPasswordVisible: false;
  token: string;

  constructor(private resetPasswordService: ResetPasswordService, private activedRoute: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.initializedResetPasswordForm();
    this.token = this.activedRoute.snapshot.params['resetPasswordToken'];
  }

  initializedResetPasswordForm() {
    this.resetPasswordForm = new FormGroup({
      password: new FormControl('', Validators.required)
    })
  }

  resetPassword() {
    if (!this.resetPasswordForm.valid) {
      return;
    }

    let password = this.resetPasswordForm.get("password").value;
    
    this.resetPasswordService.resetPassword(password, this.token).subscribe(
      data => {
        this.toastr.success("Successfully reset your password. You can log in now");
      }, error => {
        if (error.error === 'INVALID_TOKEN') {
          this.toastr.error("Invalid Token");
        } else {
          this.toastr.error("Something wrong happened with the server. Please try again later");
        }
        console.log(error);
      }
    )
  }
}
