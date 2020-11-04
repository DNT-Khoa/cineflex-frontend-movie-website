import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, delay, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { UserDetailsModal } from 'src/app/home/user-account/shared/user-details.modal';
import { HttpConfigService } from 'src/app/shared/http-config.service';
import { AdminService } from './shared/admin.service';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss'],
  animations: [
    trigger(
      'backdropOpenAnimation', 
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
                    style({ opacity: 0.5 }))
          ]
        )
      ]
    ),
    trigger(
      'modalOpenAnimation', 
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
export class AdminsComponent implements OnInit {
  isAddModalOpen = false;

  @ViewChild('searchInput') searchInput: ElementRef;
  keyUpSubscription: Subscription;
  isSearching = false;
  
  addAdminForm: FormGroup;
  deleteAdminForm: FormGroup;

  admins: UserDetailsModal[];

  constructor(private adminService: AdminService, private toastr: ToastrService, private httpConfigService: HttpConfigService) { }

  ngOnInit(): void {
    this.getAllAdmins();
    this.initializeAddAdminForm();
  }

  // Because we user @Viewchild so we should use ngAfterViewInit
  ngAfterViewInit() {
    // Listen for user keydown and start searching 
    this.keyUpSubscription = fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        debounceTime(500),
        map((event: Event) => (<HTMLInputElement>event.target).value),
        distinctUntilChanged(),
        tap(() => {
          this.isSearching = true;
        }),
        delay(600),
        switchMap(value => this.adminService.searchAdminByEmailKey(value))
      ).subscribe ( data => {
          if (this.searchInput.nativeElement.value === '') {
            this.getAllAdmins();
          } else {
            this.admins = data;
          }
          this.isSearching = false;
      }, error => {
        console.log(error);
        this.isSearching = false;
      }
      )
  }

  ngOnDestroy() {
    this.keyUpSubscription.unsubscribe();
  }


  getAllAdmins() {
    this.adminService.getAllAdmins().subscribe(
      (data) => {
        this.admins = data;
      }, 
      (error) => {
        console.log(error);
        this.toastr.error("Something is wrong with the server. Please try again later");
      }
    )
  }

  initializeAddAdminForm() {
    this.addAdminForm = new FormGroup({
      email: new FormControl('', Validators.required)
    })
  }

  inviteAdmin() {
    if (!this.addAdminForm.valid){
      return;
    }
    
    let email = this.addAdminForm.get("email").value;

    this.adminService.inviteAdmin(email).subscribe(
      data => {
        this.toastr.success("Successfully sent the invitatation to " + email);
      }, error => {
        this.toastr.error("Something wrong happened with the server. Please try again later");
        console.log(error);
      }
    )
  }

}
