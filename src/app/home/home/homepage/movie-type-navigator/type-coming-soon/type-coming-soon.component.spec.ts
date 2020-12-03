import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeComingSoonComponent } from './type-coming-soon.component';

describe('TypeComingSoonComponent', () => {
  let component: TypeComingSoonComponent;
  let fixture: ComponentFixture<TypeComingSoonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeComingSoonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeComingSoonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
