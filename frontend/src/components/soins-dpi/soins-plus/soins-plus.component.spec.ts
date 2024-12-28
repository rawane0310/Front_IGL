import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoinsPlusComponent } from './soins-plus.component';

describe('SoinsPlusComponent', () => {
  let component: SoinsPlusComponent;
  let fixture: ComponentFixture<SoinsPlusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoinsPlusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoinsPlusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
