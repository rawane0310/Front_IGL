import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSoinFormComponent } from './add-soin-form.component';

describe('AddSoinFormComponent', () => {
  let component: AddSoinFormComponent;
  let fixture: ComponentFixture<AddSoinFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSoinFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSoinFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
