import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationOrdonnanceComponent } from './creation-ordonnance.component';

describe('CreationOrdonnanceComponent', () => {
  let component: CreationOrdonnanceComponent;
  let fixture: ComponentFixture<CreationOrdonnanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreationOrdonnanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreationOrdonnanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
