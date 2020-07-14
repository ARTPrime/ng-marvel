import { TestBed } from '@angular/core/testing';

import { ComicSetGuard } from './comic-set.guard';

describe('ComicSetGuard', () => {
  let guard: ComicSetGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ComicSetGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
