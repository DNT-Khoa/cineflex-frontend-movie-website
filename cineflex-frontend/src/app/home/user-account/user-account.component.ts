import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit, Sanitizer } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { UserDetailsModal } from './shared/user-details.modal';
import { UserService } from './shared/user.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss'],
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
export class UserAccountComponent implements OnInit, OnDestroy {
  isUploadModalOpen = false;
  selectedFile: File;
  imageUrl: any;
  retrievedImage: any;
  avatarChangedSubscription: Subscription;
  user: UserDetailsModal;

  constructor(private userService: UserService, private toastr: ToastrService, private sanitizer: DomSanitizer, private authService: AuthService) { }

  ngOnInit(): void {
    this.retrievedImage = this.authService.getAvatarImageFromLocalHost();

    this.avatarChangedSubscription = this.authService.avatarChangeSubject.subscribe(
      data => {
        this.retrievedImage = data;
      }
    )

    this.userService.getUserDetails().subscribe(
      data => {
        this.user = data;
      }
    );
  }


  onFileChanged(event) {
    if (event.target.files && event.target.files[0]) {
      this.selectedFile = event.target.files[0];

      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataUrl is completed
        this.imageUrl = event.target.result;
      }
    }
  }

  onUpload() {
    if (!this.selectedFile) {
      return;
    }

    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);

    this.userService.uploadImage(uploadImageData).subscribe(
      data => {
        this.toastr.success("Successfully uploaded your new avatar");
        this.authService.getAvatarByEmail();
        this.retrievedImage = this.authService.getAvatarImageFromLocalHost();
        this.isUploadModalOpen = false;
      }, error => {
        console.log(error);
        this.toastr.error("Error happened");
      }
    )
  }

  sanitizeUrl(data: any) {
    return this.sanitizer.bypassSecurityTrustUrl(data);
  }

  ngOnDestroy() {
    this.avatarChangedSubscription.unsubscribe();
  }

}
