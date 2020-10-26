import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieTypeNavigatorComponent } from './movie-type-navigator.component';

describe('MovieTypeNavigatorComponent', () => {
  let component: MovieTypeNavigatorComponent;
  let fixture: ComponentFixture<MovieTypeNavigatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieTypeNavigatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieTypeNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
