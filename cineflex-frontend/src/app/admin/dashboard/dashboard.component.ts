import { Component, OnInit } from '@angular/core';
import { DashboardService } from './shared/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.getCountAllUsers();
  }

  getCountAllUsers() {
    this.dashboardService.getNumberOfTotalUsers().subscribe(
      data => {
        console.log(data);
      }
    )
  }

}
