import { TestBed } from '@angular/core/testing';

import { ComicsLoadGuard } from './comics-load.guard';

describe('ComicsLoadGuard', () => {
  let guard: ComicsLoadGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ComicsLoadGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
