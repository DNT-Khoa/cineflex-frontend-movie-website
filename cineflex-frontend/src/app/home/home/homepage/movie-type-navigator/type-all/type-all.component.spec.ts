import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeAllComponent } from './type-all.component';

describe('TypeAllComponent', () => {
  let component: TypeAllComponent;
  let fixture: ComponentFixture<TypeAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
