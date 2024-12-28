import { TestBed } from '@angular/core/testing';

import { UserIndicatorsServiceService } from './user-indicators-service.service';

describe('UserIndicatorsServiceService', () => {
  let service: UserIndicatorsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserIndicatorsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
