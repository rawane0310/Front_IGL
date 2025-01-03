import { TestBed } from '@angular/core/testing';

import { RadiologyImagesService } from './radiology-images.service';

describe('RadiologyImagesService', () => {
  let service: RadiologyImagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RadiologyImagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
