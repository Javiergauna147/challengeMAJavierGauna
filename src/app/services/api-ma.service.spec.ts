import { TestBed } from '@angular/core/testing';

import { ApiMAService } from './api-ma.service';

describe('ApiMAService', () => {
  let service: ApiMAService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiMAService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
