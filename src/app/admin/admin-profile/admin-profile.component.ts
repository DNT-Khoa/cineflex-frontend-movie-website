import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { UserDetailsModal } from 'src/app/home/user-account/shared/user-details.modal';
import { AdminService } from '../admins/shared/admin.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss'],
  animations: [
    trigger(
      'backgroundOverlayAnimation', 
      [
        transition(
          ':enter', 
          [
            style({ opacity: 0 }),
            animate('.5s ease-out', 
                    style({ opacity: 0.25 }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({ opacity: 0.25 }),
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
export class AdminProfileComponent implements OnInit {
  oldEmail = '';

  isEditProfileFormOpen = false;
  isChangePasswordFormOpen = false;
  isDeleteAccountFormOpen = false;

  isOldPasswordVisible = false;
  isNewPasswordVisible = false;
  isDeletePasswordVisible = false;

  editProfileForm: FormGroup;
  changePasswordForm: FormGroup;
  deleteAccountForm: FormGroup;
  admin: UserDetailsModal;

  constructor(private adminService: AdminService, private toastr: ToastrService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.getAdminDetails();
    this.initializeEditProfileForm();
    this.initializeChangePasswordForm();
    this.intializeDeleteAccountForm();
  }

  getAdminDetails() {
    this.adminService.getAdminByEmail().subscribe(
      data => {
        this.admin = data;
        this.oldEmail = data.email;
      }, error => {
        console.log(error);
        this.toastr.error("Something wrong happened with the server. Please try again later");
      }
    )
  }

  initializeEditProfileForm() {
    // this.initializeEditProfileForm();
    this.editProfileForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required])
    });
  }

  initializeChangePasswordForm() {
    this.changePasswordForm = new FormGroup({
      oldPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required)
    })
  }

  intializeDeleteAccountForm() {
    this.deleteAccountForm = new FormGroup({
      password: new FormControl('', Validators.required)
    })
  }

  editAdminDetails() {
    if (!this.editProfileForm.valid) {
      return;
    }

    this.adminService.editAdminDetails({ firstName: this.admin.firstName, lastName: this.admin.lastName, oldEmail: this.oldEmail, newEmail: this.admin.email})
    .subscribe(
      (data) => {
        this.toastr.success("Successfully updated your information.");
        this.isEditProfileFormOpen = false;
      }, 
      (error) => {
        if (error.status === 409) {
          this.toastr.error("Email already exists! Please try a different email.");
        } else {
          this.toastr.error("Something wrong happened with the server. Please try again later.");
        }
        
      }
    )
  }

  changePassword() {
    if (!this.changePasswordForm.valid) {
      this.toastr.error("Please make sure to check your form before submitting.");
      return;
    }

    console.log(this.changePasswordForm);

    let oldPassword = this.changePasswordForm.get('oldPassword').value;
    let newPassword = this.changePasswordForm.get('newPassword').value;
    this.adminService.changePassword({email: this.admin.email, oldPassword: oldPassword, newPassword: newPassword}).subscribe(
      (data) => {
        this.toastr.success("Successfully changed your password.");
        this.isChangePasswordFormOpen = false;
        this.changePasswordForm.reset();
      }, error => {
        console.log(error);
        if (error.status === 500) {
          this.toastr.error("Incorrect password! Please try again.");
        } else {
          this.toastr.error("Something wrong happened with the server. Please try again later.");
        }
      }
    )
  }

  deleteAccount() {
    if (!this.deleteAccountForm.valid) {
      this.toastr.error("Please check your form carefully before submitting.");
      return;
    }

    let password = this.deleteAccountForm.get('password').value;

    this.adminService.deleteAccount(password).subscribe(
      () => {
        this.toastr.success("Successfully deleted your account");
        this.authService.notifyUserLoggedOut();
        this.authService.clearDataStorage();
        this.router.navigateByUrl("/");
      }, 
      (error) => {
        console.log("error");
        if (error.error === 'INVALID_CREDENTIALS') {
          this.toastr.error("Incorrect password! Please try again.");
        } else {
          console.log(error);
          this.toastr.error("Something wrong happened with the server. Please try again later.");
        } 
      } 
    )
  }

  resetPasswordVisibility() {
    this.isOldPasswordVisible = false;
    this.isNewPasswordVisible = false;
    this.isDeletePasswordVisible = false;
  }

}
