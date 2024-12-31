import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysePlusComponent } from './analyse-plus.component';

describe('AnalysePlusComponent', () => {
  let component: AnalysePlusComponent;
  let fixture: ComponentFixture<AnalysePlusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalysePlusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalysePlusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
