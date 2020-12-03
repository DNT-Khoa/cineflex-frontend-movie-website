import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { animations } from './home/shared/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    animations
  ]
})
export class AppComponent {
  title = 'cineflex-frontend';

  getAnimationData(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}
