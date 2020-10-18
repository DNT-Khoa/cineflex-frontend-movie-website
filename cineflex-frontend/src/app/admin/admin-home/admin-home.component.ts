import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/shared/auth.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
  }

}
