import { TestBed } from '@angular/core/testing';

import { ExamensRadiologiquesService } from './examens-radiologiques.service';

describe('ExamensRadiologiquesService', () => {
  let service: ExamensRadiologiquesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamensRadiologiquesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
