import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { trigger, style, transition, animate } from '@angular/animations';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger(
      'hamburgerDropdownAnimation', 
      [
        transition(
          ':enter', 
          [
            style({ transform: "scale(2)", opacity: 0 }),
            animate('.5s ease-out', 
                    style({ transform: "scale(1)", opacity: 1 }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({ transform: "scale(1)", opacity: 1 }),
            animate('.5s ease-out', 
                    style({ transform: "scale(1.5)", opacity: 0 }))
          ]
        )
      ]
    ),
    trigger(
      'userDropdownAnimation',
      [
        transition(
          ':enter',
          [
            style({transform: "scale(0.9)", opacity: 0}),
            animate('.1s ease-out', style({ transform: "scale(1)", opacity: 1}))
          ]
        ),
        transition(
          ':leave',
          [
            style({ transform: "scale(1)", opacity: 1}),
            animate('.1s ease-out', style({transform: "scale(0.9)", opacity: 0}))
          ]
        )
      ]
    ),
    trigger(
      'darkOverlayAnimation',
      [
        transition(
          ':enter',
          [
            style({opacity: 0}),
            animate('.5s ease-out', style({ opacity: 0.75}))
          ]
        ),
        transition(
          ':leave',
          [
            style({ opacity: 0.75}),
            animate('.5s ease-out', style({opacity: 0}))
          ]
        )
      ]
    )
  ]
})
export class HeaderComponent implements OnInit, OnDestroy {
  isDropdownOpen = false;
  isUserDropdownOpen = false;
  isUserLoggedIn: boolean;
  subscription: Subscription;
  isHeaderMoving = false;

  // Using Hostlistener to change header background after the header get away from its original size a specific height
  @HostListener("document:scroll")
  scrollFunction() {
    if (document.body.scrollTop > 90 || document.documentElement.scrollTop > 90) {
      this.isHeaderMoving = true;
    } else {
      this.isHeaderMoving = false;
    }
  }

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isUserLoggedIn = this.authService.isUserLoggedIn();
    this.subscription = this.authService.loggedInSubject.subscribe(
      (loggedInStatus: boolean) => {
        this.isUserLoggedIn = loggedInStatus;
      }
    )
  }

  logOut() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
