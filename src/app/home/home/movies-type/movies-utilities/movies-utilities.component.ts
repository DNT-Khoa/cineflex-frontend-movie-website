import { animate, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, delay, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { MovieModal } from 'src/app/admin/movies/shared/movie.modal';
import { MovieService } from 'src/app/home/shared/movie.service';

@Component({
  selector: 'app-movies-utilities',
  templateUrl: './movies-utilities.component.html',
  styleUrls: ['./movies-utilities.component.scss'],
  animations: [
    trigger(
      'modalOpenAnimation', 
      [
        transition(
          ':enter', 
          [
            style({ opacity: 0 }),
            animate('.3s ease-out', 
                    style({ opacity: 1 }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({ opacity: 1 }),
            animate('.2s ease-in', 
                    style({ opacity: 0 }))
          ]
        )
      ]
    ),
  ]
})
export class MoviesUtilitiesComponent implements OnInit, OnDestroy, AfterViewInit {
  searchValue: string = '';
  isSearching = false;
  movieSearchInputSubscription: Subscription;
  searchResults: MovieModal[];

  @ViewChild("searchInput") postSearchInput: ElementRef;

  constructor(private movieService: MovieService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.movieSearchInputSubscription = fromEvent(this.postSearchInput.nativeElement, 'keyup')
      .pipe(
        debounceTime(300),
        map((event: Event) => (<HTMLInputElement>event.target).value),
        distinctUntilChanged(),
        tap(() => {
          this.isSearching = true;
        }),
        delay(500),
        switchMap(value => {
          if (value !== '') {
            return this.movieService.searchMovieByQueryKey(value);
          }

          return [];
        })
      ).subscribe( value => {
        this.searchResults = value;
        this.isSearching = false;
      }, error => {
        console.log(error);
        this.toastr.error('Something wrong with the server. Please try again later');
        this.isSearching = false;
      }
      )
  }

  ngOnDestroy() {
    this.movieSearchInputSubscription.unsubscribe();
  }
}
