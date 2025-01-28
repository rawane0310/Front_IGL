import { TestBed } from '@angular/core/testing';

import { UserIndicatorsServiceServiceService } from './user-indicators-service.service.service';

describe('UserIndicatorsServiceServiceService', () => {
  let service: UserIndicatorsServiceServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserIndicatorsServiceServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
