import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsUtilitiesComponent } from './news-utilities.component';

describe('NewsUtilitiesComponent', () => {
  let component: NewsUtilitiesComponent;
  let fixture: ComponentFixture<NewsUtilitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsUtilitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsUtilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
