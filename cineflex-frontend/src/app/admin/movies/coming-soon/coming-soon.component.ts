import { animate, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, delay, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { CategoriesService } from '../../categories/shared/categories.service';
import { CategoryModal } from '../../categories/shared/category.modal';
import { MovieModal } from '../shared/movie.modal';
import { MovieService } from '../shared/movie.service';
import { TMDBMovieModal } from '../shared/tmdbmovie.modal';

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
    ),
    trigger(
      'categoryDropdownSelect', 
      [
        transition(
          ':enter', 
          [
            style({ opacity: 0, height: 0 }),
            animate('.3s ease-out', 
                    style({ opacity: 1, height: 80 }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({ opacity: 1, height: 80}),
            animate('.2s ease-in', 
                    style({ opacity: 0, height: 0 }))
          ]
        )
      ]
    )
  ]
})
export class ComingSoonComponent implements OnInit, AfterViewInit, OnDestroy {
  isUpdateModalOpen = false;
  isAddModalOpen = false;
  isDeleteModalOpen = false;
  isConvertModalOpen = false;
  selectedMovie: MovieModal;
  
  isCategoryDropdownOpen = false;

  @ViewChild('tmdbSearchInput') tmdbSearchInput: ElementRef;
  tmdbSearchInputSubscritpion: Subscription

  tmdbMovieResults: TMDBMovieModal[];
  isSearching = false;

  updateMovieForm: FormGroup;
  addMovieForm: FormGroup;
  deleteMovieForm: FormGroup;
  convertMovieForm: FormGroup;

  movies: MovieModal[];
  categories: CategoryModal[];

  constructor(private movieService: MovieService, private toastr: ToastrService, private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.getAllComingMovies();
    this.getAllCategories();
    this.initializeAddMovieForm();
    this.initializeUpdateMovieForm();
    this.initializeDeleteMovieForm();
    this.initializeConvertMovieForm();
  }

  // Because we user @Viewchild so we should use ngAfterViewInit
  ngAfterViewInit() {
    // Start searching for movies from TMDB on user input event
    this.tmdbSearchInputSubscritpion = fromEvent(this.tmdbSearchInput.nativeElement, 'keyup')
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
            return this.movieService.searchMovieByTitle(value)
          }

          return [];
        })
      ).subscribe( value => {
        this.tmdbMovieResults = value.results;
        this.isSearching = false;
      }, error => {
        console.log(error);
        this.toastr.error('Something wrong with the server. Please try again later');
        this.isSearching = false;
      }
      )
  }

  ngOnDestroy() {
    this.tmdbSearchInputSubscritpion.unsubscribe();
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

  getAllCategories() {
    this.categoriesService.getAllCategories().subscribe(
      (data) => {
        this.categories = data;
        console.log(this.categories);
      }, (error) => {
        console.log(error);
        this.toastr.error('Something wrong happened with the server. Please try again later');
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
      movieType: new FormControl({ value: '', disabled: true}, Validators.required),
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

  initializeConvertMovieForm() {
    this.convertMovieForm = new FormGroup({
      id: new FormControl({value: '', disabled: true}, Validators.required),
      tmdbId: new FormControl({value: '', disabled: true}, Validators.required),
      title: new FormControl({value: '', disabled: true}, Validators.required),
      movieType: new FormControl({ value: 'Now Playing', disabled: true}, Validators.required),
      filmLink: new FormControl('', Validators.required)
    })
  }

  addMovie() {
    this.movieService.addNewMovie(this.selectedMovie).subscribe(
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

  convertMovieToNowPlaying() {
    if (!this.convertMovieForm.valid) {
      this.toastr.error('Please make sure to fill in all the required fields before submitting the form');
      return;
    }

    this.selectedMovie.movieType = 'Now Playing';
    this.movieService.updateMovieById(this.selectedMovie.id, this.selectedMovie)
      .subscribe((data) => {
        this.toastr.success("Successfully converted the movie to Now Playing");
        this.getAllComingMovies();
      }, (error) => {
        console.log(error);
        this.toastr.error("Something wrong happened. Please try again later");
      })
  }

  updateCategory(category: CategoryModal) {
    for (let c of this.selectedMovie.categories) {
      if (c.name === category.name) {
        return;
      }
    }

    this.selectedMovie.categories.push(category);
  }

  removeCategory(category: CategoryModal) {
    for (let i = 0; i < this.selectedMovie.categories.length; i++) {
      if (this.selectedMovie.categories[i].name === category.name) {
        this.selectedMovie.categories.splice(i, 1);
        return;
      }
    }
  }

  resetMovieObject() {
    this.selectedMovie = {
      id: null,
      tmdbId: null,
      title: '',
      rating: null,
      posterLink: '',
      backdropLink: '',
      movieType: '',
      filmLink: '',
      categories: []
    }
  }

  convertMovieResultToMovieModal(movieResult: TMDBMovieModal) {
    this.selectedMovie = {
      tmdbId: movieResult.id,
      title: movieResult.title,
      rating: movieResult.vote_average,
      posterLink: 'https://image.tmdb.org/t/p/original' + movieResult.poster_path,
      backdropLink: 'https://image.tmdb.org/t/p/original' + movieResult.backdrop_path,
      movieType: 'Coming Soon',
      filmLink: '',
      categories: []
    }

    this.isAddModalOpen = true;
  }


}
