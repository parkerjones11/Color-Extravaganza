import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorGenerationComponent } from './color-generation.component';

describe('ColorGenerationComponent', () => {
  let component: ColorGenerationComponent;
  let fixture: ComponentFixture<ColorGenerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorGenerationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColorGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
