import { TestBed } from '@angular/core/testing';

import { ResultatAnalyseService } from './resultat-analyse.service';

describe('ResultatAnalyseService', () => {
  let service: ResultatAnalyseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResultatAnalyseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
