import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeNowplayingComponent } from './type-nowplaying.component';

describe('TypeNowplayingComponent', () => {
  let component: TypeNowplayingComponent;
  let fixture: ComponentFixture<TypeNowplayingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeNowplayingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeNowplayingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
