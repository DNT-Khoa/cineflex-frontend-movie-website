import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { AdminCredentialsService } from './shared/admin-credentials.service';

@Component({
  selector: 'app-admin-credentials',
  templateUrl: './admin-credentials.component.html',
  styleUrls: ['./admin-credentials.component.scss']
})
export class AdminCredentialsComponent implements OnInit {
  adminCredentialsForm: FormGroup;
  isPasswordVisible: false;
  token: string;

  constructor(private adminCredentialsService: AdminCredentialsService, private activedRoute: ActivatedRoute, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.initializedAdminCredentialsForm();
    this.token = this.activedRoute.snapshot.params['adminInvitationToken'];
  }

  initializedAdminCredentialsForm() {
    this.adminCredentialsForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  registerAdmin() {
    if (!this.adminCredentialsForm.valid) {
      return;
    }

    let firstName = this.adminCredentialsForm.get("firstName").value;
    let lastName = this.adminCredentialsForm.get("lastName").value;
    let password = this.adminCredentialsForm.get("password").value;

    this.adminCredentialsService.registerAdmin({
      firstName: firstName,
      lastName: lastName,
      password: password,
      token: this.token
    }).subscribe(
      data => {
        this.toastr.success("We have successfully registered you as an admin. Please login");
        this.router.navigateByUrl("/auth/login");
      }, error => {
        if (error.error === 'ADMIN_ALREADY_REGISTERED') {
          this.toastr.error("You have already joined us! Please log in or ask us to send another invitation link for you");
        } else if (error.error === 'INVALID_TOKEN') {
          this.toastr.error("Invalid Token. We cannot find any matching token");
        } else if (error.error === 'EXPIRED_TOKEN') {
          this.toastr.error("Invitation token has expired. If you haven't joined us. Please tell our team to invite you again");
        } else {
          this.toastr.error("Something wrong happned with server. Please try again later");
        }
        console.log(error);
      }
    )
  }

}
