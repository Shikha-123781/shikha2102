import { TestBed } from '@angular/core/testing';

import { GetpostsService } from './getposts.service';

describe('GetpostsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetpostsService = TestBed.get(GetpostsService);
    expect(service).toBeTruthy();
  });
});
