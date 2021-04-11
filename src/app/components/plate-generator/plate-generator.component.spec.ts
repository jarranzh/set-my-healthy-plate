import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlateGeneratorComponent } from './plate-generator.component';

describe('PlateGeneratorComponent', () => {
  let component: PlateGeneratorComponent;
  let fixture: ComponentFixture<PlateGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlateGeneratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlateGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
