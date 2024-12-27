import { TestBed } from '@angular/core/testing';

import { SoinsInfermiersService } from './soins-infermiers.service';

describe('SoinsInfermiersService', () => {
  let service: SoinsInfermiersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoinsInfermiersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
