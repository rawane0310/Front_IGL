import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenPlusComponent } from './examen-plus.component';

describe('ExamenPlusComponent', () => {
  let component: ExamenPlusComponent;
  let fixture: ComponentFixture<ExamenPlusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamenPlusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamenPlusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
