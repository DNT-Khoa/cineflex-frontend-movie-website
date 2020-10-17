import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate } from '@angular/animations';
import { AuthService } from 'src/app/auth/shared/auth.service';

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
    )
  ]
})
export class HeaderComponent implements OnInit {
  isDropdownOpen = false;
  isUserDropdownOpen = false;
  isUserLoggedIn: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isUserLoggedIn = this.authService.isUserLoggedIn();
    this.authService.loggedInSubject.subscribe(
      (loggedInStatus: boolean) => {
        this.isUserLoggedIn = loggedInStatus;
      }
    )
  }

  logOut() {
    this.authService.logout();
  }

}
