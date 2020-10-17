import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MockService } from './mock.service';

@Component({
  selector: 'app-mock',
  templateUrl: './mock.component.html',
  styleUrls: ['./mock.component.scss']
})
export class MockComponent implements OnInit {
  valueToBeShown = 'Currently I have no value';
  constructor(private mockService: MockService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  getValue() {
    this.mockService.getStatus().subscribe(
      (message: string) => {
        this.valueToBeShown = message;
      },
      (error) => {
        if (error.status === 401) {
          this.toastr.error("You are not authorized to perform the action");
        }
      }
    );
  }
}
