import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuDpiComponent } from '../menu-dpi/menu-dpi.component';
import { ExamensDpiComponent } from './examens-dpi.component';

describe('ExamensDpiComponent', () => {
  let component: ExamensDpiComponent;
  let fixture: ComponentFixture<ExamensDpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamensDpiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamensDpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
