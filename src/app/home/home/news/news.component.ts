import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { animations } from '../../shared/animations';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'], 
  animations: [
    animations
  ]
})
export class NewsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  getAnimationData(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

}
