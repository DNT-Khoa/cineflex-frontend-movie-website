import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from './shared/categories.service';
import { CategoryModal } from './shared/category.modal';

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
export class CategoriesComponent implements OnInit {
  isUpdateModalOpen = false;
  isAddModalOpen = false;
  isDeleteModalOpen = false;
  selectedCategory: CategoryModal;
  
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

  getAllCategories() {
    this.categoriesService.getAllCategories().subscribe(
      (data) => {
        this.categories = data;
        console.log(this.categories)
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
        this.getAllCategories;
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
