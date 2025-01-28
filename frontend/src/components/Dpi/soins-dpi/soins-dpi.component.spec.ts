import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuDpiComponent } from '../menu-dpi/menu-dpi.component';
import { SoinsDpiComponent } from './soins-dpi.component';

describe('SoinsDpiComponent', () => {
  let component: SoinsDpiComponent;
  let fixture: ComponentFixture<SoinsDpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoinsDpiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoinsDpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
