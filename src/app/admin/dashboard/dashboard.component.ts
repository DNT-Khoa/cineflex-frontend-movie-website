import { Component, OnInit } from '@angular/core';
import { DashboardService } from './shared/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  numOfUsers: number;
  numOfMovies: number;
  numOfPosts: number;
  numOfComments: number;
  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.getCountAllUsers();
    this.getCountAllComments();
    this.getCountAllMovies();
    this.getCountAllPosts();
  }

  getCountAllUsers() {
    this.dashboardService.getNumberOfTotalUsers().subscribe(
      data => {
        this.numOfUsers = data;
      }
    )
  }

  getCountAllMovies() {
    this.dashboardService.getNumberOfTotalMovies().subscribe(
      data => {
        this.numOfMovies = data;
      }
    )
  }

  getCountAllPosts() {
    this.dashboardService.getNumberOfTotalPosts().subscribe(
      data => {
        this.numOfPosts = data;
      }
    )
  }

  getCountAllComments() {
    this.dashboardService.getNumberOfTotalComments().subscribe(
      data => {
        this.numOfComments = data;
      }
    )
  }

}
