import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/shared/auth.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
  animations: [
    trigger(
      'dropdownAnimation', 
      [
        transition(
          ':enter', 
          [
            style({ height: 0, transform: "translateX(-64px)", opacity: 0 }),
            animate('0.4s ease-out', 
                    style({ height: 64, transform: "translateX(0)", opacity: 1 }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({ height: 64, transform: "translateX(0)", opacity: 1 }),
            animate('0.3s ease-in', 
                    style({ height: 0, transform: "translateX(64px)", opacity: 0 }))
          ]
        )
      ]
    ),
    trigger(
      'headerDropdownAnimation', 
      [
        transition(
          ':enter', 
          [
            style({ height: 0, opacity: 0 }),
            animate('0.4s ease-out', 
                    style({ height: 288, opacity: 1 }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({ height: 288, opacity: 1 }),
            animate('0.3s ease-in', 
                    style({ height: 0, opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class AdminHomeComponent implements OnInit, OnDestroy {
  isDropdownOpen = false;
  isHeaderMenuOpen = true;
  isLargeBreakpoint = true;
  screenResizeObservable: Observable<Event>;
  screenResizeSubscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.screenResizeObservable = fromEvent(window, 'resize');
    this.screenResizeSubscription = this.screenResizeObservable.subscribe(
      (event) => {
        if ( (event.currentTarget as Window).innerWidth < 1024) {
          this.isHeaderMenuOpen = false;
          this.isLargeBreakpoint = false;
        } else {
          this.isHeaderMenuOpen = true;
          this.isLargeBreakpoint = true;
        }
      }
    )
  }

  ngOnDestroy() {
    this.screenResizeSubscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
  }

}
