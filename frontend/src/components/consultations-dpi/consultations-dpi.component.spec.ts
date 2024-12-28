import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuDpiComponent } from '../menu-dpi/menu-dpi.component';
import { ConsultationsDpiComponent } from './consultations-dpi.component';

describe('ConsultationsDpiComponent', () => {
  let component: ConsultationsDpiComponent;
  let fixture: ComponentFixture<ConsultationsDpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultationsDpiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultationsDpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
