import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCategoryNavigatorComponent } from './movie-category-navigator.component';

describe('MovieCategoryNavigatorComponent', () => {
  let component: MovieCategoryNavigatorComponent;
  let fixture: ComponentFixture<MovieCategoryNavigatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieCategoryNavigatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieCategoryNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
