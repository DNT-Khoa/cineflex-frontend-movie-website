import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, delay, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { MovieModal } from '../shared/movie.modal';
import { MovieService } from '../shared/movie.service';

@Component({
  selector: 'app-coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrls: ['./coming-soon.component.scss'],
  animations: [
    trigger(
      'backdropOpenAnimation', 
      [
        transition(
          ':enter', 
          [
            style({ opacity: 0 }),
            animate('.3s ease-out', 
                    style({ opacity: 0.5 }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({ opacity: 0.5 }),
            animate('.2s ease-in', 
                    style({ opacity: 0.5 }))
          ]
        )
      ]
    ),
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
    )
  ]
})
export class ComingSoonComponent implements OnInit {
  isUpdateModalOpen = false;
  isAddModalOpen = false;
  isDeleteModalOpen = false;
  selectedMovie: MovieModal;

  // @ViewChild('searchInput') searchInput: ElementRef;
  // searchKeyUpSubscription: Subscription;
  searchResults: MovieModal[];
  isSearching = false;

  updateMovieForm: FormGroup;
  addMovieForm: FormGroup;
  deleteMovieForm: FormGroup;

  movies: MovieModal[];

  constructor(private movieService: MovieService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllComingMovies();
    this.initializeAddMovieForm();
    this.initializeUpdateMovieForm();
    this.initializeDeleteMovieForm();
  }

  // Because we user @Viewchild so we should use ngAfterViewInit
  ngAfterViewInit() {
    // Listen for user keydown and start searching 
    // this.keyUpSubscription = fromEvent(this.searchInput.nativeElement, 'keyup')
    //   .pipe(
    //     debounceTime(500),
    //     map((event: Event) => (<HTMLInputElement>event.target).value),
    //     distinctUntilChanged(),
    //     tap(() => {
    //       this.isSearching = true;
    //     }),
    //     delay(300),
    //     switchMap(value => this.categoriesService.searchCategoryByName(value))
    //   ).subscribe ( data => {
    //       if (this.searchInput.nativeElement.value === '') {
    //         this.searchResults = [];
    //       } else {
    //         this.searchResults = data;
    //       }
    //       this.isSearching = false;
    //   }, error => {
    //     console.log(error);
    //     this.isSearching = false;
    //   }
    //   )
  }

  ngOnDestroy() {
    // this.searchKeyUpSubscription.unsubscribe();
  }

  getAllComingMovies() {
    this.movieService.getAllComingMovies().subscribe(
      (data) => {
        this.movies = data;
        console.log(data)
      },
      (error) => {
        console.log(error);
        this.toastr.error('Something wrong happen with the server. Please try again later.');
      }
    )
  }

  initializeUpdateMovieForm() {
    this.updateMovieForm = new FormGroup({
      id: new FormControl({value: '', disabled: true}, Validators.required),
      tmdbId: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      rating: new FormControl('', Validators.required),
      posterLink: new FormControl('', Validators.required),
      backdropLink: new FormControl('', Validators.required),
      movieType: new FormControl({value: '', disabled: true}, Validators.required),
      filmLink: new FormControl({value: '', disabled: true}),
    })
  }

  initializeAddMovieForm() {
    this.addMovieForm = new FormGroup({
      tmdbId: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      rating: new FormControl('', Validators.required),
      posterLink: new FormControl('', Validators.required),
      backdropLink: new FormControl('', Validators.required),
      movieType: new FormControl('', Validators.required),
      filmLink: new FormControl({value: '', disabled: true})
    })
  }

  initializeDeleteMovieForm() {
    this.deleteMovieForm = new FormGroup({
      id: new FormControl({ value: '', disabled: true}, Validators.required),
      tmdbId: new FormControl({ value: '', disabled: true}, Validators.required),
      title: new FormControl({ value: '', disabled: true}, Validators.required),
      rating: new FormControl({ value: '', disabled: true}, Validators.required),
      posterLink: new FormControl({ value: '', disabled: true}, Validators.required),
      backdropLink: new FormControl({ value: '', disabled: true}, Validators.required),
      movieType: new FormControl({ value: '', disabled: true}, Validators.required),
      filmLink: new FormControl({ value: '', disabled: true}),
    })
  }

  addMovie() {
    const movieRequestPayload = new MovieModal();

    movieRequestPayload.tmdbId = this.addMovieForm.get('tmdId').value,
    movieRequestPayload.title = this.addMovieForm.get('title').value,
    movieRequestPayload.rating = this.addMovieForm.get('rating').value,
    movieRequestPayload.posterLink = this.addMovieForm.get('posterLink').value,
    movieRequestPayload.backdropLink = this.addMovieForm.get('backdropLink').value,
    movieRequestPayload.movieType =  this.addMovieForm.get('movieType').value,
    movieRequestPayload.movieType = null;
    // Remember to also include list of categories
      

    this.movieService.addNewMovie(movieRequestPayload).subscribe(
      (data) => {
        this.toastr.success('Successfully created the movie');
        this.getAllComingMovies();
      },
      (error) => {
        if (error.status === 409) {
          this.toastr.error('Movie already exits. Please choose a different movie');
        } else {
          this.toastr.error('Something wrong happened. Please try again later');
        }
      }
    );
  }

  updateMovie() {
    if (!this.updateMovieForm.valid) {
      this.toastr.error('Please make sure to fill all required fields before submitting the form!');
      return;
    }

    this.movieService.updateMovieById(this.selectedMovie.id, this.selectedMovie).subscribe(
      (data) => {
        this.toastr.success('Successfully updated the movie');
        this.getAllComingMovies();
      },
      (error) => {
        console.log(error);
      }
    )
  }

  deleteMovie() {
    this.movieService.deleteMovie(this.selectedMovie.id).subscribe(
      (data) => {
        this.toastr.success("Successfully deleted the category");
        this.getAllComingMovies();
      },
      (error) => {
        this.toastr.error('Something wrong happened. Please try again later');
      }
    );
  }

}
