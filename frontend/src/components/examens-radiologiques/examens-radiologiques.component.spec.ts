import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamensRadiologiquesComponent } from './examens-radiologiques.component';

describe('ExamensRadiologiquesComponent', () => {
  let component: ExamensRadiologiquesComponent;
  let fixture: ComponentFixture<ExamensRadiologiquesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamensRadiologiquesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamensRadiologiquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
