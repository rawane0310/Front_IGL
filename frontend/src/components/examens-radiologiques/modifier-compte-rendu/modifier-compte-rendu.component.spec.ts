import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierCompteRenduComponent } from './modifier-compte-rendu.component';

describe('ModifierCompteRenduComponent', () => {
  let component: ModifierCompteRenduComponent;
  let fixture: ComponentFixture<ModifierCompteRenduComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierCompteRenduComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierCompteRenduComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
