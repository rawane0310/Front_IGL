import { TestBed } from '@angular/core/testing';

import { AnalysesBiologiquesService } from './analyses-biologiques.service';

describe('AnalysesBiologiquesService', () => {
  let service: AnalysesBiologiquesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnalysesBiologiquesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
