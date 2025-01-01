import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterRadiologyImageComponent } from './ajouter-radiology-image.component';

describe('AjouterRadiologyImageComponent', () => {
  let component: AjouterRadiologyImageComponent;
  let fixture: ComponentFixture<AjouterRadiologyImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterRadiologyImageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterRadiologyImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
