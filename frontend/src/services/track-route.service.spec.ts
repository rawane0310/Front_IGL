import { TestBed } from '@angular/core/testing';

import { TrackRouteService } from './track-route.service';

describe('TrackRouteService', () => {
  let service: TrackRouteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrackRouteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
