import { animate, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, delay, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { PostModal } from 'src/app/admin/news/shared/posts.modal';
import { NewsService } from '../shared/news.service';

@Component({
  selector: 'app-news-utilities',
  templateUrl: './news-utilities.component.html',
  styleUrls: ['./news-utilities.component.scss'],
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
export class NewsUtilitiesComponent implements OnInit, AfterViewInit, OnDestroy {
  searchValue: string = '';
  isSearching = false;
  postSearchInputSubscription: Subscription;
  searchResults: PostModal[];

  @ViewChild("searchInput") postSearchInput: ElementRef;

  constructor(private newsService: NewsService, private toastr: ToastrService) { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.postSearchInputSubscription = fromEvent(this.postSearchInput.nativeElement, 'keyup')
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
            return this.newsService.searchPostByKey(value);
          }

          return [];
        })
      ).subscribe( value => {
        console.log(value);
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
    this.postSearchInputSubscription.unsubscribe();
  }

}
