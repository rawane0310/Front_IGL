import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterExamenBioComponent } from './ajouter-examen-bio.component';

describe('AjouterExamenBioComponent', () => {
  let component: AjouterExamenBioComponent;
  let fixture: ComponentFixture<AjouterExamenBioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterExamenBioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterExamenBioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
