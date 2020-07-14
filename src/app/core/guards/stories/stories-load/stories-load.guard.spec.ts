import { TestBed } from '@angular/core/testing';

import { StoriesLoadGuard } from './stories-load.guard';

describe('StoriesLoadGuard', () => {
  let guard: StoriesLoadGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(StoriesLoadGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
