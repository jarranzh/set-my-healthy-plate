import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotAllowedIngredientsComponent } from './not-allowed-ingredients.component';

describe('NotAllowedIngredientsComponent', () => {
  let component: NotAllowedIngredientsComponent;
  let fixture: ComponentFixture<NotAllowedIngredientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotAllowedIngredientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotAllowedIngredientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
