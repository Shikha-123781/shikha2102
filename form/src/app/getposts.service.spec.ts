import { TestBed } from '@angular/core/testing';

import { GetPostsService } from './getposts.service';

describe('GetPostsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetpostsService = TestBed.get(GetpostsService);
    expect(service).toBeTruthy();
  });
});
