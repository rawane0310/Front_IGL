import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { dpiPatientGuard } from './dpi.patient.guard';

describe('dpiPatientGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => dpiPatientGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
