import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger(
      'inOutAnimation', 
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
    )
  ]
})
export class HeaderComponent implements OnInit {
  isDropdownOpen = false;
  constructor() { }

  ngOnInit(): void {

  }

  toggleDropdown():void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

}
