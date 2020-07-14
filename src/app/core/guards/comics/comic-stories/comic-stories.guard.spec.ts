import { TestBed } from '@angular/core/testing';

import { ComicStoriesGuard } from './comic-stories.guard';

describe('ComicStoriesGuard', () => {
  let guard: ComicStoriesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ComicStoriesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
