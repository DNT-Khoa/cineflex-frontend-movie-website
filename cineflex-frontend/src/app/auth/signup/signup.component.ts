import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { SignupRequestPayload } from './signup-request.payload';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  isLoading = false;
  isPasswordVisible = false;
  signupRequestPayload: SignupRequestPayload;
  signupForm: FormGroup

  constructor(private authService: AuthService) {
    this.signupRequestPayload = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    };
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', Validators.required)
    })
  }

  signup() {
    // This will help solve if someone found a way to call this method
    // without filling valid credentials
    if (!this.signupForm.valid) {
      return;
    }

    this.isLoading = true;

    this.signupRequestPayload.firstName = this.signupForm.get('firstName').value;
    this.signupRequestPayload.lastName = this.signupForm.get('lastName').value;
    this.signupRequestPayload.email = this.signupForm.get('email').value;
    this.signupRequestPayload.password = this.signupForm.get('password').value;

    setTimeout(() => {
      this.authService.signup(this.signupRequestPayload)
      .subscribe(
        data => {
          console.log(data);
          this.isLoading = false;
        },
        error => {
          console.log(error);
          this.isLoading = false;
        }
      );
    }, 2000)
    
  }

}
