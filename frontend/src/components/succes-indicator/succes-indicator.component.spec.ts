import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccesIndicatorComponent } from './succes-indicator.component';

describe('SuccesIndicatorComponent', () => {
  let component: SuccesIndicatorComponent;
  let fixture: ComponentFixture<SuccesIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccesIndicatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccesIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
