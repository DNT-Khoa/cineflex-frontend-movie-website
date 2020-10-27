import { animate, animateChild, query, style, transition, trigger, group } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, delay, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { MovieModal } from 'src/app/admin/movies/shared/movie.modal';
import { animations } from 'src/app/home/shared/animations';
import { MovieService } from 'src/app/home/shared/movie.service';

@Component({
  selector: 'app-movie-type-navigator',
  templateUrl: './movie-type-navigator.component.html',
  styleUrls: ['./movie-type-navigator.component.scss'],
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
    animations
  ]
})
export class MovieTypeNavigatorComponent implements OnInit, OnDestroy, AfterViewInit {
  apiSearchInputSubscription: Subscription;
  moviesResult: MovieModal[];
  isSearching = false;

  @ViewChild("apiSearchInput") apiSearchInput: ElementRef;

  constructor(private movieService: MovieService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.apiSearchInputSubscription = fromEvent(this.apiSearchInput.nativeElement, 'keyup')
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
        console.log(value);
        this.moviesResult = value;
        this.isSearching = false;
      }, error => {
        console.log(error);
        this.toastr.error('Something wrong with the server. Please try again later');
        this.isSearching = false;
      }
      )
  }

  ngOnDestroy() {
    this.apiSearchInputSubscription.unsubscribe();
  }

  getAnimationData(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}
