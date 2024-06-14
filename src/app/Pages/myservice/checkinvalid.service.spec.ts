import { TestBed } from '@angular/core/testing';

import { CheckinvalidService } from './checkinvalid.service';

describe('CheckinvalidService', () => {
  let service: CheckinvalidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckinvalidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
