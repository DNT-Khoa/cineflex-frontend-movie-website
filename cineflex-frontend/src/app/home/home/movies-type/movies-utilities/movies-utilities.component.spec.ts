import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesUtilitiesComponent } from './movies-utilities.component';

describe('MoviesUtilitiesComponent', () => {
  let component: MoviesUtilitiesComponent;
  let fixture: ComponentFixture<MoviesUtilitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoviesUtilitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesUtilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
