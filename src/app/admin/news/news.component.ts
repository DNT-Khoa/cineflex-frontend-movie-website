import { animate, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, delay, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { HttpConfigService } from 'src/app/shared/http-config.service';
import { CategoriesService } from '../categories/shared/categories.service';
import { CategoryModal } from '../categories/shared/category.modal';
import { PostRequestModal } from './shared/posts-request.modal';
import { PostModal } from './shared/posts.modal';
import { NewsService } from './shared/posts.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  animations: [
    trigger(
      'backdropOpenAnimation', 
      [
        transition(
          ':enter', 
          [
            style({ opacity: 0 }),
            animate('.5s ease-out', 
                    style({ opacity: 0.5 }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({ opacity: 0.5 }),
            animate('.5s ease-out', 
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
            animate('.5s ease-out', 
                    style({ opacity: 1 }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({ opacity: 1 }),
            animate('.5s ease-out', 
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
export class NewsComponent implements OnInit, AfterViewInit, OnDestroy {
  isUpdateModalOpen = false;
  isAddModalOpen = false;
  isDeleteModalOpen = false;
  isCategoryDropdownOpen = false;
  selectedPost: PostModal;

  @ViewChild('searchInput') searchInput: ElementRef;
  keyUpSubscription: Subscription;
  isSearching = false;
  
  updateNewsForm: FormGroup;
  addNewsForm: FormGroup;
  deleteNewsForm: FormGroup;

  categories: CategoryModal[];
  posts: PostModal[];

  constructor(private newsService: NewsService, private toastr: ToastrService, private httpConfigService: HttpConfigService, private categoryService: CategoriesService) { }

  ngOnInit(): void {
    this.getAllPosts();
    this.getAllCategories();
    this.initializeAddPostForm();
    this.initializeUpdatePostForm();
    this.initializeDeletePostForm();
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
        delay(600),
        switchMap(value => this.newsService.searchPostByKey(value))
      ).subscribe ( data => {
          if (this.searchInput.nativeElement.value === '') {
            this.getAllPosts();
          } else {
            this.posts = data;
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
    this.categoryService.getAllCategories().subscribe(
      (data) => {
        this.categories = data;
      }, 
      (error) => {
        console.log(error);
        this.toastr.error("Something is wrong with the server. Please try again later");
      }
    )
  }

  getAllPosts() {
    this.newsService.getAllPosts().subscribe(
      (data) => {
        this.posts = data;
      }, 
      (error) => {
        console.log(error);
        this.toastr.error("Something is wrong with the server. Please try again later");
      }
    )
  }

  initializeSelectedPost() {
    this.selectedPost = {
      id: null,
      backdropImage: '',
      title: '',
      content: '',
      categories: [],
      createdAt: null
    }
  }

  initializeUpdatePostForm() {
    this.updateNewsForm = new FormGroup({
      id: new FormControl({value: '', disabled: true}, Validators.required),
      pushlishDate: new FormControl({value: '', disabled: true}, Validators.required),
      title: new FormControl('', Validators.required),
      backdropImage: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required)
    })
  }

  initializeAddPostForm() {
    this.addNewsForm = new FormGroup({
      title: new FormControl('', Validators.required),
      backdropImage: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required)
    })
  }

  initializeDeletePostForm() {
    this.deleteNewsForm = new FormGroup({
      id: new FormControl({value: '', disabled: true}, Validators.required),
      pushlishDate: new FormControl({value: '', disabled: true}, Validators.required),
      title: new FormControl({ value: '', disabled: true}, Validators.required),
      backdropImage: new FormControl({ value: '', disabled: true}, Validators.required),
      content: new FormControl({ value: '', disabled: true}, Validators.required)
    })
  }

  addPost() {
    if (!this.addNewsForm.valid) {
      return;
    }
    let postRequestModal = new PostRequestModal();
    postRequestModal.title = this.selectedPost.title;
    postRequestModal.backdropImage = this.selectedPost.backdropImage;
    postRequestModal.categories = this.selectedPost.categories;
    postRequestModal.content = this.selectedPost.content;

    this.newsService.createPost(postRequestModal).subscribe(
      (data) => {
        this.toastr.success("Successfully created the post");
        this.getAllPosts();
        this.isAddModalOpen = false;
        this.isCategoryDropdownOpen = false;
        this.addNewsForm.reset();
      },
      (error) => {
        console.log(error);
        this.toastr.error("Something wrong happened with the server. Please try again later");
      }
    )
  }

  updatePost() {
    if (!this.updateNewsForm.valid) {
      return;
    }
    let postRequestModal = new PostRequestModal();
    postRequestModal.title = this.selectedPost.title;
    postRequestModal.backdropImage = this.selectedPost.backdropImage;
    postRequestModal.categories = this.selectedPost.categories;
    postRequestModal.content = this.selectedPost.content;

    this.newsService.editPost(this.selectedPost.id, postRequestModal).subscribe(
      (data) => {
        this.toastr.success("Successfully updated the post");
        this.getAllPosts();
        this.isUpdateModalOpen = false;
        this.isCategoryDropdownOpen = false;
      },
      (error) => {
        console.log(error);
        this.toastr.error("Something wrong happened with the server. Please try again later");
      }
    )
  }

  deletePost() {
    this.newsService.deletePost(this.selectedPost.id).subscribe(
      data => {
        this.toastr.success("Successfully deleted the post");
        this.getAllPosts();
        this.isDeleteModalOpen = false;
      }, error => {
        console.log(error);
        this.toastr.error("Something wrong happened with the server. Please try again later");
      }
    )
  }

  updateCategory(category: CategoryModal) {
    for (let c of this.selectedPost.categories) {
      if (c.name === category.name) {
        return;
      }
    }

    this.selectedPost.categories.push(category);
  }

  removeCategory(category: CategoryModal) {
    for (let i = 0; i < this.selectedPost.categories.length; i++) {
      if (this.selectedPost.categories[i].name === category.name) {
        this.selectedPost.categories.splice(i, 1);
        return;
      }
    }
  }

}
