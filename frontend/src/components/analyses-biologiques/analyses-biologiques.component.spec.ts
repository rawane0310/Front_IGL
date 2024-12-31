import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysesBiologiquesComponent } from './analyses-biologiques.component';

describe('AnalysesBiologiquesComponent', () => {
  let component: AnalysesBiologiquesComponent;
  let fixture: ComponentFixture<AnalysesBiologiquesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalysesBiologiquesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalysesBiologiquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
