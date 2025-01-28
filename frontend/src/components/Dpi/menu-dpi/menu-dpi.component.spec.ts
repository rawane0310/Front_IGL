import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterOutlet } from '@angular/router';
import { MenuDpiComponent } from './menu-dpi.component';

describe('MenuDpiComponent', () => {
  let component: MenuDpiComponent;
  let fixture: ComponentFixture<MenuDpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuDpiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuDpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
