import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DpiPageComponent } from './dpi-page.component';

describe('DpiPageComponent', () => {
  let component: DpiPageComponent;
  let fixture: ComponentFixture<DpiPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DpiPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DpiPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
