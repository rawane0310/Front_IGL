import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterCompteRenduComponent } from './ajouter-compte-rendu.component';

describe('AjouterCompteRenduComponent', () => {
  let component: AjouterCompteRenduComponent;
  let fixture: ComponentFixture<AjouterCompteRenduComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterCompteRenduComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterCompteRenduComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
