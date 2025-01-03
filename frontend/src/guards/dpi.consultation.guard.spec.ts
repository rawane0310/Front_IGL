import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { dpiConsultationGuard } from './dpi.consultation.guard';

describe('dpiConsultationGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => dpiConsultationGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
