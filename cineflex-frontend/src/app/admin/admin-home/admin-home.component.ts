import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
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
            animate('0.5s ease-out', 
                    style({ height: 64, transform: "translateX(0)", opacity: 1 }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({ height: 64, transform: "translateX(0)", opacity: 1 }),
            animate('0.4s ease-in', 
                    style({ height: 0, transform: "translateX(64px)", opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class AdminHomeComponent implements OnInit {
  isDropdownOpen = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
  }

}
