import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { UserDetailsModal } from '../shared/user-details.modal';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss'],
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
export class ProfileDetailsComponent implements OnInit {
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

  user: UserDetailsModal;

  constructor(private userService: UserService, private toastr: ToastrService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.getUser();
    this.initializeEditProfileForm();
    this.initializeChangePasswordForm();
    this.intializeDeleteAccountForm();
  }

  getUser() {
    // Get user from the API
    this.userService.getUserDetails().subscribe(
      (data) => {
        this.user = data;
        this.oldEmail = data.email;
      },
      (error) => {
        console.log(error);
        this.toastr.error("Something wrong happened. Please try again later");
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

  editUserDetails() {
    if (!this.editProfileForm.valid) {
      return;
    }

    this.userService.editUserDetails({ firstName: this.user.firstName, lastName: this.user.lastName, oldEmail: this.oldEmail, newEmail: this.user.email})
    .subscribe(
      (data) => {
        this.toastr.success("Successfully updated your information");
      }, 
      (error) => {
        if (error.status === 409) {
          this.toastr.error("Email already exits! Please try a different email");
        } else {
          this.toastr.error("Something wrong happened with the server. Please try again later");
        }
        
      }
    )
  }

  changePassword() {
    if (!this.changePasswordForm.valid) {
      this.toastr.error("Please make sure to check your form before submitting");
      return;
    }

    console.log(this.changePasswordForm);

    let oldPassword = this.changePasswordForm.get('oldPassword').value;
    let newPassword = this.changePasswordForm.get('newPassword').value;
    this.userService.changePassword({email: this.user.email, oldPassword: oldPassword, newPassword: newPassword}).subscribe(
      (data) => {
        this.toastr.success("Successfully changed your password");
      }, error => {
        console.log(error);
        if (error.status === 500) {
          this.toastr.error("Incorrect password! Please try again");
        } else {
          this.toastr.error("Something wrong happened with the server. Please try again later");
        }
      }
    )
  }

  deleteAccount() {
    if (!this.deleteAccountForm.valid) {
      this.toastr.error("Please check your form carefully before submitting");
      return;
    }

    let password = this.deleteAccountForm.get('password').value;

    this.userService.deleteAccount(password).subscribe(
      () => {
        this.toastr.success("Successfully deleted your account");
        this.authService.notifyUserLoggedOut();
        this.authService.clearDataStorage();
        this.router.navigateByUrl("/");
      }, 
      (error) => {
        if (error.status === 500) {
          this.toastr.error("Incorrect password! Please try again");
        } else {
          console.log(error);
          this.toastr.error("Something wrong happened with the server. Please try again later");
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
