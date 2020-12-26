import { animate, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { fromEvent, Subscription, Observable } from 'rxjs';
import { CategoriesService } from './shared/categories.service';
import { CategoryModal } from './shared/category.modal';
import { debounceTime, delay, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
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
export class CategoriesComponent implements OnInit, AfterViewInit, OnDestroy {
  isUpdateModalOpen = false;
  isAddModalOpen = false;
  isDeleteModalOpen = false;
  selectedCategory: CategoryModal;

  @ViewChild('searchInput') searchInput: ElementRef;
  keyUpSubscription: Subscription;
  searchResults: CategoryModal[];
  isSearching = false;
  
  updateCategoryForm: FormGroup;
  addCategoryForm: FormGroup;
  deleteCategoryForm: FormGroup;

  categories: CategoryModal[];

  constructor(private categoriesService: CategoriesService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllCategories();
    this.initializeAddCategoryForm();
    this.initializeUpdateCategoryForm();
    this.initializeDeleteCategoryForm();
  }

  // Because we user @Viewchild so we should use ngAfterViewInit
  ngAfterViewInit() {
    // Listen for user keydown and start searching 
    this.keyUpSubscription = fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        debounceTime(500),
        map((event: Event) => (<HTMLInputElement>event.target).value),
        distinctUntilChanged(),
        tap(() => {
          this.isSearching = true;
        }),
        delay(300),
        switchMap(value => this.categoriesService.searchCategoryByName(value))
      ).subscribe ( data => {
          if (this.searchInput.nativeElement.value === '') {
            this.searchResults = [];
          } else {
            this.searchResults = data;
          }
          this.isSearching = false;
      }, error => {
        console.log(error);
        this.isSearching = false;
      }
      )
  }

  ngOnDestroy() {
    this.keyUpSubscription.unsubscribe();
  }

  getAllCategories() {
    this.categoriesService.getAllCategories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.log(error);
        this.toastr.error('Something wrong happen with the server. Please try again later.');
      }
    )
  }

  initializeUpdateCategoryForm() {
    this.updateCategoryForm = new FormGroup({
      id: new FormControl({value: '', disabled: true}, Validators.required),
      name: new FormControl('', [Validators.required])
    })
  }

  initializeAddCategoryForm() {
    this.addCategoryForm = new FormGroup({
      name: new FormControl('', Validators.required)
    })
  }

  initializeDeleteCategoryForm() {
    this.deleteCategoryForm = new FormGroup({
      id: new FormControl({ value: '', disabled: true}, Validators.required),
      name: new FormControl({ value: '', disabled: true}, Validators.required)
    })
  }

  addCategory() {
    let categoryRequestPayload = {
      name: this.addCategoryForm.get('name').value
    }

    this.categoriesService.addNewCategory(categoryRequestPayload).subscribe(
      (data) => {
        this.toastr.success('Successfully created the category');
        this.getAllCategories();
        this.isAddModalOpen = false;
        this.addCategoryForm.reset();
      },
      (error) => {
        if (error.status === 409) {
          this.toastr.error('Name already exits. Please choose a different category name');
        } else {
          this.toastr.error('Something wrong happened. Please try again later');
        }
      }
    );
  }

  updateCategory() {
    if (!this.updateCategoryForm.valid) {
      this.toastr.error('Please make sure to fill in all fields before submitting!');
      return;
    }

    this.categoriesService.updateCategoryById(this.selectedCategory.id, this.selectedCategory).subscribe(
      (data) => {
        this.toastr.success('Successfully updated the category');
        this.getAllCategories();
        this.isUpdateModalOpen = false;
        this.updateCategoryForm.reset()
      },
      (error) => {
        if (error.status === 409) {
          this.toastr.error('Category name already exits. Please choose a different name');
        }
      }
    )
  }

  deleteCategory() {
    this.categoriesService.deleteCategoryById(this.selectedCategory.id).subscribe(
      (data) => {
        this.toastr.success("Successfully deleted the category");
        this.getAllCategories();
      },
      (error) => {
        this.toastr.error('Something wrong happened. Please try again later');
      }
    );
  }

}
