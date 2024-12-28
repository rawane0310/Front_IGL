import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfosDpiComponent } from './infos-dpi.component';

describe('InfosDpiComponent', () => {
  let component: InfosDpiComponent;
  let fixture: ComponentFixture<InfosDpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfosDpiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfosDpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
