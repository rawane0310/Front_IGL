import { TestBed } from '@angular/core/testing';

import { InfoPatientService } from './info-patient.service';

describe('InfoPatientService', () => {
  let service: InfoPatientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoPatientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
